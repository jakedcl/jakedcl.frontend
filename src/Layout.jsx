import NavBar from './components/NavBar'; // Import the new NavBar component
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Layout container to handle flexbox layout and positioning
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.colors.background};
`;

// Main content area with padding for the NavBar
const MainContent = styled.main`
  flex: 1;
  margin-left: 5rem;
  margin-top: 1rem;
  padding: 1.2rem;
  position: relative;
  max-width: calc(100vw - 7.4rem);
  width: calc(100vw - 7.4rem);
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 6rem;
    padding: 1.2rem;
    max-width: 100vw;
    width: 100vw;
  }
`;

const Watermark = styled.div`
  position: absolute;
  top: 5px;
  right: 2rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.5;
  font-family: monospace;
  z-index: 10;
  pointer-events: none;
  user-select: none;
  padding: 2px 5px;
`;

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <NavBar />
      <Watermark>jakedcl</Watermark>
      <MainContent>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

/*

index.html
└── App (App.jsx)
    └── ThemeProvider
        └── Router
            └── Layout
                ├── NavBar
                └── MainContent
                    ├── HomePage
                    │   └── Container
                    │       └── PageSection
                    │           ├── Title ("welcome, look around")
                    │           ├── Subtext (social links)
                    │           └── ObjectContainer
                    │               └── MyObject
                    │                   └── Minitruck
                    │
                    ├── MediaPage
                    │   └── Container
                    │       ├── PageSection (Photos)
                    │       │   ├── Title ("photo")
                    │       │   └── PreviewGrid
                    │       │       ├── Card
                    │       │       │   ├── CardTitle
                    │       │       │   ├── CardDescription
                    │       │       │   └── CardMedia
                    │       │       └── Card
                    │       │           ├── CardTitle
                    │       │           ├── CardDescription
                    │       │           └── CardMedia
                    │       └── PageSection (Videos)
                    │           ├── Title ("video")
                    │           └── PreviewGrid
                    │               ├── Card
                    │               │   ├── CardTitle
                    │               │   ├── CardDescription
                    │               │   └── CardMedia
                    │               └── Card
                    │                   ├── CardTitle
                    │                   ├── CardDescription
                    │                   └── CardMedia
                    │
                    ├── ProjectsPage
                    │   └── Container
                    │       └── PageSection
                    │           ├── Title ("web dev")
                    │           └── PreviewGrid
                    │               └── StyledLink
                    │                   └── Card
                    │                       ├── CardTitle
                    │                       ├── CardDescription
                    │                       └── CardMedia
                    │
                    ├── BlogPage
                    │   └── Container
                    │       └── PageSection
                    │           ├── Title ("blog")
                    │           └── PreviewGrid
                    │               └── StyledLink
                    │                   └── Card
                    │                       ├── CardTitle
                    │                       ├── CardDescription
                    │                       └── CardMedia
                    │
                    ├── MapsPage
                    │   └── Container
                    │       └── PageSection
                    │           ├── Title ("interactive maps")
                    │           └── PreviewGrid
                    │               └── StyledLink
                    │                   └── Card
                    │                       ├── CardTitle
                    │                       └── CardDescription
                    │
                    ├── AdirondacksMap
                    │   └── Container
                    │       └── PageSection
                    │           └── MapboxMap
                    │
                    └── NotFoundPage
                        └── Container
                            └── PageSection
                                └── Title ("404")


*/