import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Layout from './Layout';
import MainPage from './pages/MainPage';
import AdirondacksMap from './pages/maps/AdirondacksMap';
import BlogEditor from './pages/admin/BlogEditor';
import BlogPost from './pages/blog/BlogPost';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={
            <Layout>
              <MainPage />
            </Layout>
          } />
          <Route path="/maps/adk" element={<AdirondacksMap />} />
          <Route path="/admin/blog" element={<Layout><BlogEditor /></Layout>} />
          <Route path="/blog/:id" element={
            <Layout>
              <BlogPost />
            </Layout>
          } />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;