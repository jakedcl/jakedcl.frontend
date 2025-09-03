import { Container, Title, Subtext, ResponsivePageSection, Card, CardTitle, CardDescription, PreviewGrid, MyLink } from '../Styles';
import MyObject from '../components/MyObjects/MyObject';
import Minitruck from '../components/MyObjects/Minitruck';
import styled from 'styled-components';
import VideoCarousel from '../components/VideoCarousel';
import PhotoCarousel from '../components/PhotoCarousel';
import { useState, useEffect } from 'react';
import { endpoints } from '.././services/api';

const ObjectContainer = styled.div`
  width: 40%;
  height: 40%;
  max-height: 40%;
  max-width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 75%;
    max-width: 75%; 
  }
`;

const ResponsivePreviewGrid = styled(PreviewGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
`;

export default function MainPage() {

    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch(endpoints.blog.posts);
                const data = await response.json();
                setBlogPosts(data.data);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

    const content = {
        social: [
            { text: '@jakedcl on instagram', link: 'https://instagram.com/jakedcl' },
            { text: '@bannquet on instagram', link: 'https://instagram.com/bannquet' },
            { text: '@jakedcl on youtube', link: 'https://youtube.com/@jakedcl' },
            { text: '@jacobdcl on github', link: 'https://github.com/jacobdcl' },
            { text: '@jacobdcl on linkedin', link: 'https://linkedin.com/in/jacobdcl' },
        ],
        webProjects: [
            {
                title: 'ez-pass data visualizer',
                description: 'understand your ez-pass tolls and costs',
                link: 'https://ezpny.vercel.app',
            },
            {
                title: 'drewdella.com',
                description: 'parody of google.com for rapper drew della',
                link: 'https://drewdella.com',
            },
            {
                title: 'jasiahpowers.com',
                description: 'portfolio site for creative jasiah powers',
                link: 'https://jasiahpowers.com',
            },
        ],
        maps: [
            {
                title: 'adirondack high peaks of new york',
                description: '3D Map - bannquet.com.',
                link: '/maps/adk',
            },
        ],
        blogPosts: blogPosts
    };

    return (
        <Container>
            <ResponsivePageSection id="home">
                <Title>welcome, look around</Title>
                <Subtext>
                    {content.social.map((item, index) => (
                        <MyLink
                            key={index}
                            href={item.link}
                            isExternal
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Subtext>{item.text}</Subtext>
                        </MyLink>
                    ))}
                </Subtext>
                <ObjectContainer>
                    <MyObject controlsOn={true}>
                        <Minitruck />
                    </MyObject>
                </ObjectContainer>
            </ResponsivePageSection>

            <ResponsivePageSection id="web">
                <Title>🌐 web dev</Title>
                <ResponsivePreviewGrid>
                    {content.webProjects?.map((item, index) => (
                        <MyLink
                            key={index}
                            href={item.link}
                            isExternal
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Card>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </Card>
                        </MyLink>
                    ))}
                </ResponsivePreviewGrid>
            </ResponsivePageSection>

            <ResponsivePageSection id="maps">
                <Title>📍 interactive maps</Title>
                <ResponsivePreviewGrid>
                    {content.maps.map((item, index) => (
                        <MyLink key={index} to={item.link}>
                            <Card>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </Card>
                        </MyLink>
                    ))}
                </ResponsivePreviewGrid>
            </ResponsivePageSection>

            <ResponsivePageSection id="photos">
                <Title>📷 photo</Title>
                <PhotoCarousel />
            </ResponsivePageSection>

            <ResponsivePageSection id="videos">
                <Title>📹 video</Title>
                <VideoCarousel playlistId="PLRVrdnNWT_fgwqLD7u_7p1ZRhgCjOtZVG&si=NIQJm5u8Cr4QHGgv" />
            </ResponsivePageSection>

            <ResponsivePageSection id="blog">
                <Title>📝 blog</Title>
                <ResponsivePreviewGrid>
                    {blogPosts?.map((post, index) => (
                        <MyLink key={index} to={`/blog/${post._id}`}>
                            <Card>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>
                                    {new Date(post.date).toLocaleDateString()}
                                </CardDescription>
                                <CardDescription>
                                    {post.content.length > 100
                                        ? `${post.content.substring(0, 100)}...`
                                        : post.content}
                                </CardDescription>
                            </Card>
                        </MyLink>
                    ))}
                </ResponsivePreviewGrid>
            </ResponsivePageSection>

            <section>
                <h2>3D Objects</h2>
                <div style={{
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <p>3D Models temporarily unavailable - Coming soon!</p>
                </div>
            </section>
        </Container>
    );
} 