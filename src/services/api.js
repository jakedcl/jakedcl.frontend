const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    blog: {
        posts: `${API_URL}/api/blog/posts`,
        post: (id) => `${API_URL}/api/blog/posts/${id}`,
    },
    cloudinary: {
        collections: `${API_URL}/api/cloudinary/collections`,
    },
    adk: `${API_URL}/api/adk`,
}; 