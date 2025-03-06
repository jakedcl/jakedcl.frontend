import styled from 'styled-components';
import { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import MarkerStyle from './MarkerStyle';
import { Subtext } from '../Styles.jsx';

const PullIndicator = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (min-width: 769px) {
    top: 50%;
    right: 10px;
    width: 4px;
    height: 40px;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 50%;
    width: 40px;
    height: 4px;
    transform: translateX(-50%);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 769px) {
    top: 0;
    left: 0;
    height: 100vh;
    width: 300px;
    padding-right: 2rem;
    transform: ${({ $isOpen }) =>
        $isOpen
            ? 'translateX(0)'
            : 'translateX(calc(-100% + 2rem))'};
    border-radius: 0 12px 12px 0;
  }

  @media (max-width: 768px) {
    bottom: 0;
    left: 0;
    right: 0;
    height: 60vh;
    padding-top: 2rem;
    transform: ${({ $isOpen, $swipeOffset }) =>
        $isOpen
            ? `translateY(${$swipeOffset}px)`
            : 'translateY(calc(100% - 6rem))'};
    border-radius: 12px 12px 0 0;
  }
`;

const SideCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const CategoryToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

const HomeButton = styled.button`
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    color: #000;
  }
`;

const SidebarOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
    z-index: 99;
  }
`;

export default function Sidebar({
    pins,
    setSearchQuery,
    setSelectedPin,
    flyToPin,
    visibleCategories,
    setVisibleCategories,
    selectedPin
}) {
    const [isOpen, setIsOpen] = useState(true);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [startY, setStartY] = useState(null);
    const sidebarRef = useRef(null);
    const isMobile = window.innerWidth <= 768;

    const handleTouchStart = (e) => {
        if (!isMobile) return;
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (!isMobile || startY === null) return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (isOpen) {
            // When open, only allow downward swipe
            if (diff > 0) {
                setSwipeOffset(diff);
            }
        } else {
            // When closed, only allow upward swipe
            if (diff < 0) {
                setSwipeOffset(diff);
            }
        }
    };

    const handleTouchEnd = () => {
        if (!isMobile) return;
        if (isOpen && swipeOffset > 100) { // Threshold to close
            setIsOpen(false);
        } else if (!isOpen && swipeOffset < -50) { // Threshold to open
            setIsOpen(true);
        }
        setSwipeOffset(0);
        setStartY(null);
    };

    const handleClick = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    return (
        <>
            <SidebarOverlay
                $isOpen={isOpen}
                onClick={() => isMobile && setIsOpen(false)}
            />
            <SidebarWrapper
                ref={sidebarRef}
                $isOpen={isOpen}
                $swipeOffset={swipeOffset}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
            >
                <PullIndicator onClick={() => setIsOpen(!isOpen)} />
                <SideCard>
                    <SearchBar
                        pins={pins}
                        setSearchQuery={setSearchQuery}
                        setSelectedPin={setSelectedPin}
                        flyToPin={flyToPin}
                    />
                </SideCard>

                {/* InfoPanel */}
                {selectedPin && (
                    <SideCard>
                        <h4>{selectedPin.name}</h4>
                        <p>Class: {selectedPin.type}</p>
                        {selectedPin.elevation && <p>Elevation: {selectedPin.elevation}ft</p>}
                        <p>Coordinates: {selectedPin.coordinates.join(', ')}</p>
                    </SideCard>
                )}

                <SideCard>
                    <Subtext>Categories</Subtext>
                    {Object.entries(visibleCategories).map(([categoryId, isVisible]) => (
                        <CategoryToggle key={categoryId}>
                            <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={() => {
                                    setVisibleCategories(prev => ({
                                        ...prev,
                                        [categoryId]: !prev[categoryId]
                                    }));
                                }}
                            />
                            <div style={MarkerStyle(categoryId)} />
                            {categoryId}
                        </CategoryToggle>
                    ))}
                </SideCard>
                <HomeButton onClick={() => window.location.href = '/'}>
                    ← jakedcl.com
                </HomeButton>
            </SidebarWrapper>
        </>
    );
}
