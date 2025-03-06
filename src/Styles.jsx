import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Title style
export const Title = styled.h1`
  margin-top: .2rem;
  margin-bottom: 1.8rem;
  font-size: 2rem;
  font-weight: bold;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

// Subtext style
export const Subtext = styled.h2`
  font-size: 1.2rem;
  color: black;
  margin-top: 0;
  margin-bottom: 1rem;
`;

// Container style
export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-x: hidden;
  min-width: 0;
  
  & > * {
    max-width: 100%;
    min-width: 0;
  }
`;

// Page Section style
export const ResponsivePageSection = styled.div`
  width: 95%;
  max-width: 1200px;
  min-width: 0;
  padding: 1.5rem;
  margin: 0.75rem auto;
  background: rgba(246, 246, 246, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(233, 233, 233, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  
  & > * {
    max-width: 100%;
    min-width: 0;
  }

  @media (max-width: 768px) {
    width: 92%;
    padding: 1rem;
    margin: 0.5rem auto;
  }
`;

// Card Components
export const Card = styled.div`
  border: 1px solid rgba(233, 233, 233, 0.8);
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    
    &:hover {
      transform: none;
    }
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.primary};
    
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const CardMedia = styled.div`
  width: 100%;
  margin-top: .75rem;
  
  img, video {
    width: 100%;
    height: auto;
    border-radius: 4px;
    object-fit: cover;
  }
`;

export const PreviewSection = styled(ResponsivePageSection)`
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;  // Single column on mobile
    gap: 0.75rem;
  }
`;

export const MyLink = styled(({ isExternal, ...props }) => {
  const Component = isExternal ? 'a' : Link;
  return <Component {...props} />;
})`
  text-decoration: inherit;
  color: inherit;
  display: block;
  font-weight: 350;
  font-size: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export const SectionLink = styled(MyLink)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;