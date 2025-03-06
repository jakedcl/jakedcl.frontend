import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Title, Card, MyLink } from '../../Styles';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { endpoints } from '../../services/api';

const TitleWithMargin = styled(Title)`
    margin-bottom: 0.5rem;
`;

const CardWithPadding = styled(Card)`
    padding: 2rem;
`;

const Content = styled.div`
    margin: 2rem 0;
    line-height: 1.6;
    
    img {
        max-width: 100%;
        border-radius: 8px;
        margin: 1rem 0;
    }
`;

const TagList = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
`;

const CardMedia = styled.div`
    margin: 1rem 0;
`;

const Tag = styled.span`
    background-color: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
`;

export default function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(endpoints.blog.post(id));
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data = await response.json();
                setPost(data.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchPost();
    }, [id]);

    if (error) return (
        <Container>
            <Card>
                <Title>Error</Title>
                <p>{error}</p>
                <MyLink to="/">Return Home</MyLink>
            </Card>
        </Container>
    );

    if (!post) return (
        <Container>
            <Card>
                <Title>Loading...</Title>
            </Card>
        </Container>
    );

    return (
        <Container>
            <CardWithPadding>
                <TitleWithMargin>{post.title}</TitleWithMargin>
                <small>
                    {new Date(post.date).toLocaleDateString()} •
                    {post.readingTime} min read
                </small>

                {post.tags?.length > 0 && (
                    <TagList>
                        {post.tags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagList>
                )}

                {post.images?.map((image, index) => (
                    <CardMedia key={index}>
                        <img src={image.data} alt={image.caption} />
                        {image.caption && <small>{image.caption}</small>}
                    </CardMedia>
                ))}

                <Content>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {post.content}
                    </ReactMarkdown>
                </Content>

                <small><MyLink to="/">Return Home</MyLink></small>
            </CardWithPadding>
        </Container>
    );
} 