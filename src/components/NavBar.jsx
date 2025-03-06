import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, red, yellow);
  height: 98vh;
  width: 6rem;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem 0;
  z-index: 1000;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    height: 5rem;
    width: 100%;
    bottom: 0;
    top: auto;
    left: 0;
    transform: none;
    border-radius: 0;
    padding: 0;
  }
`;

const NavIconWrapper = styled.div`
  position: relative;
  margin: 0.75rem 0;
  
  @media (max-width: 768px) {
    margin: 0;
    width: 20%;
    display: flex;
    justify-content: center;
  }
`;

const NavIcon = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
    transition: transform 0.2s ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    
    img {
      width: 4rem;
      height: 4rem;
    }
  }
`;

const navItems = [
  { id: 'home', icon: '/icons/home.png', label: 'Home' },
  { id: 'web', icon: '/icons/web.png', label: 'Web' },
  { id: 'maps', icon: '/icons/maps.png', label: 'Maps' },
  { id: 'photos', icon: '/icons/media.png', label: 'Media' },
  { id: 'blog', icon: '/icons/blog.png', label: 'Blog' },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100; // Adjust this value as needed
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <NavBarContainer>
      {navItems.map((item) => (
        <NavIconWrapper key={item.id}>
          <NavIcon
            $isActive={activeSection === item.id}
            onClick={() => handleNavClick(item.id)}
          >
            <img src={item.icon} alt={item.label} />
          </NavIcon>
        </NavIconWrapper>
      ))}
    </NavBarContainer>
  );
}