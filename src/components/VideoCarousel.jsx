import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: auto;
  min-width: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0px;
    height: 100%;
    background: transparent;
    pointer-events: none;
    z-index: 2;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 0rem;
  width: max-content;
  min-width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.75rem 0rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  
  &::-webkit-scrollbar {
    display: none;
  }

`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.colors.background}E6`};
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingState = styled.div`
  width: 100%;
  height: 157.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;

  @media (max-width: 768px) {
    height: 135px;
  }
`;

const VideoPreview = styled.div`
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 0rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 0 0 150px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 200px;
  height: 130px; 
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 78.75px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoTitle = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 0.5rem;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    max-width: 120px;
  }
`;

const VideoModal = styled(ModalOverlay)`
  z-index: 1000;
`;

const VideoModalContent = styled.div`
  width: 90vw;
  height: 50.625vw;
  max-width: 1280px;
  max-height: 720px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.8rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function VideoCarousel({ playlistId }) {
  VideoCarousel.propTypes = {
    playlistId: PropTypes.string.isRequired
  };
  const scrollRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!playlistId) {
        setError('No playlist ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollDistance = direction === 'left' ? -300 : 300; // Slightly more than video width
      const currentScroll = scrollRef.current.scrollLeft;

      scrollRef.current.scrollTo({
        left: currentScroll + scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  if (loading) return <LoadingState>Loading videos...</LoadingState>;
  if (error) return <LoadingState>{error}</LoadingState>;
  if (!videos.length) return <LoadingState>No videos found</LoadingState>;

  return (
    <>
      <CarouselContainer>
        <ScrollContainer ref={scrollRef} $showLeftFade={showLeftFade} $showRightFade={showRightFade}>
          {videos.map((video) => (
            <VideoPreview key={video.id}>
              <ThumbnailContainer onClick={() => handleVideoClick(video)}>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              </ThumbnailContainer>
              <VideoTitle>{video.snippet.title}</VideoTitle>
            </VideoPreview>
          ))}
        </ScrollContainer>
      </CarouselContainer>

      {modalOpen && selectedVideo && createPortal(
        <VideoModal>
          <CloseButton onClick={() => setModalOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <VideoModalContent>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}?autoplay=1`}
              title={selectedVideo.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoModalContent>
        </VideoModal>,
        document.body
      )}
    </>
  );
} 