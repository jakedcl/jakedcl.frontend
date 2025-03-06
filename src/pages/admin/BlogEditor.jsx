import { Container, Title, Card, CardTitle, CardDescription, ResponsivePageSection, PreviewGrid } from '../../Styles';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import { FiImage, FiTag, FiSave, FiTrash2 } from 'react-icons/fi';
import { endpoints } from '../../services/api';

const EditorContainer = styled(Card)`
  cursor: default;
  &:hover {
    transform: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: rgba(200, 200, 200, 0.8);
  cursor: pointer;
  margin-right: 0.5rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(180, 180, 180, 0.8);
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

const ImageUploadButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: auto;
`;

const TagInput = styled(Input)`
  width: auto;
  margin-right: 0.5rem;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
`;

const Tag = styled.span`
    background: rgba(246, 246, 246, 0.8);
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    button {
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
        color: #666;
    }
`;

export default function BlogEditor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [status, setStatus] = useState('published');
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(endpoints.blog.posts);
            const data = await response.json();
            setPosts(data.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(endpoints.blog.posts, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    images,
                    tags,
                    status,
                    date: new Date().toISOString()
                })
            });
            if (response.ok) {
                setTitle('');
                setContent('');
                setImages([]);
                setTags([]);
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(endpoints.blog.post(id), {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchPosts(); // Refresh the posts list
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, {
                    data: reader.result,
                    caption: file.name
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <Container>
            <ResponsivePageSection>
                <Title>✍️ new blog post</Title>
                <EditorContainer>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <RichTextEditor
                        value={content}
                        onChange={(value) => setContent(value)}
                    />

                    <TagContainer>
                        {tags.map(tag => (
                            <Tag key={tag}>
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)}>×</button>
                            </Tag>
                        ))}
                    </TagContainer>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <TagInput
                            placeholder="Add tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                        />
                        <Button onClick={handleAddTag}>Add Tag</Button>
                    </div>

                    <ImageUploadButton as="label">
                        <FiImage /> Add Images
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </ImageUploadButton>
                    <br />
                    <Button onClick={handleSubmit}>
                        <FiSave /> {status === 'draft' ? 'Save Draft' : 'Publish'}
                    </Button>
                </EditorContainer>
            </ResponsivePageSection>

            <ResponsivePageSection>
                <Title>📝 existing posts</Title>
                <ResponsivePreviewGrid>
                    {posts.map((post) => (
                        <Card key={post._id}>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                                {new Date(post.date).toLocaleDateString()}
                            </CardDescription>
                            <CardDescription>
                                {post.content.length > 100
                                    ? `${post.content.substring(0, 100)}...`
                                    : post.content}
                            </CardDescription>
                            <Button onClick={() => handleDelete(post._id)}>
                                Delete
                            </Button>
                        </Card>
                    ))}
                </ResponsivePreviewGrid>
            </ResponsivePageSection>
        </Container>
    );
}
