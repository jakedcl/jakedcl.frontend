import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Portal from './Portal';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;
  margin: 0 auto;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
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

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 80px;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    transition: opacity 0.2s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.background}, transparent);
    opacity: ${props => props.$showLeftFade ? 1 : 0};
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.colors.background}, transparent);
    opacity: ${props => props.$showRightFade ? 1 : 0};
  }
`;

const PreviewContainer = styled.div`
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 0 0 160px;
  }
`;

const CollectionPreview = styled.div`
  width: 180px;
  height: 135px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 120px;
    height: 80px;
  }
`;

const StackedImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CollectionTitle = styled.div`
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

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'left' ? 'left: 0;' : 'right: 0;'}
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
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.8rem;
    opacity: 0.8;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
    
    svg {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
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

const ModalCarousel = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem;
`;

const ModalControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  position: absolute;
  bottom: 2rem;
`;

const ModalNavigationButton = styled(ScrollButton)`
  position: static;
  transform: none;
  margin-top: 4rem;
  width: 40px;
  height: 40px;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CarouselImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled(ScrollButton)`
  position: fixed;
  top: 20px;
  right: 20px;
  transform: none;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 120px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  padding: 1rem;
  background: ${({ theme }) => `${theme.colors.background}40`};
  backdrop-filter: blur(8px);
  border-radius: 6px;
`;

export default function PhotoCarousel() {
  const scrollRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        console.log('Fetching collections...');

        const response = await fetch('http://localhost:5001/api/cloudinary/collections');
        const { data } = await response.json();
        setCollections(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load collections: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollDistance = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const handleModalNavigation = (direction) => {
    if (!selectedCollection) return;

    setCurrentImageIndex(prevIndex => {
      const lastIndex = selectedCollection.images.length - 1;
      if (direction === 'left') {
        return prevIndex === 0 ? lastIndex : prevIndex - 1;
      } else {
        return prevIndex === lastIndex ? 0 : prevIndex + 1;
      }
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <LoadingMessage>Loading collections...</LoadingMessage>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <LoadingContainer>
          <LoadingMessage>{error}</LoadingMessage>
        </LoadingContainer>
      );
    }

    if (!collections.length) {
      return (
        <LoadingContainer>
          <LoadingMessage>No collections found</LoadingMessage>
        </LoadingContainer>
      );
    }

    return (
      <ScrollContainer ref={scrollRef} $showLeftFade={showLeftFade} $showRightFade={showRightFade}>
        {collections.map((collection) => (
          <PreviewContainer key={collection.id}>
            <CollectionPreview onClick={() => handleCollectionClick(collection)}>
              {[...Array(3)].map((_, index) => (
                <StackedImage
                  key={index}
                  className="stacked-image"
                >
                  <img
                    src={collection.images[index] || collection.coverImage}
                    alt={`${collection.title} preview ${index + 1}`}
                  />
                </StackedImage>
              ))}
            </CollectionPreview>
            <CollectionTitle>{collection.title}</CollectionTitle>
          </PreviewContainer>
        ))}
      </ScrollContainer>
    );
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

  return (
    <>
      <CarouselContainer>
        {renderContent()}
      </CarouselContainer>

      {modalOpen && (
        <Portal>
          <ModalOverlay>
            <CloseButton onClick={() => setModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>

            <ModalCarousel>
              <CarouselImage
                src={selectedCollection?.images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
              />
              <ModalControls>
                <ModalNavigationButton onClick={() => handleModalNavigation('left')}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </ModalNavigationButton>
                <ModalNavigationButton onClick={() => handleModalNavigation('right')}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </ModalNavigationButton>
              </ModalControls>
            </ModalCarousel>
          </ModalOverlay>
        </Portal>
      )}
    </>
  );
} 