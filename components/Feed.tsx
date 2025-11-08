import React, { useState, useEffect } from 'react';
import { Post, Ad } from '../types';
import PostCard from './PostCard';
import AdCard from './AdCard';
import CreatePost from './CreatePost';
import { generateFeedContent } from '../services/geminiService';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const ads: Ad[] = [
        { id: 1, title: 'Supercharge Your Workflow', company: 'Innovate Inc.', content: 'Discover the next generation of productivity tools. AI-powered assistants to help you achieve more.', cta: 'Learn More' }
    ];

    const loadPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedPosts = await generateFeedContent();
            setPosts(fetchedPosts);
        } catch (err) {
            console.error(err);
            setError('Failed to load feed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handlePostCreated = (newPost: Post) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const feedItems: (Post | Ad)[] = [...posts];
    if (feedItems.length > 2) {
        feedItems.splice(2, 0, ads[0]); // Insert ad
    }

    return (
        <div className="max-w-2xl mx-auto">
            <CreatePost onPostCreated={handlePostCreated} />
            <div className="mt-6 space-y-6">
                {loading && (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-gray-400 mt-4">Generating your feed...</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
                        <p>{error}</p>
                        <button onClick={loadPosts} className="mt-2 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                            Retry
                        </button>
                    </div>
                )}
                {!loading && !error && feedItems.map((item) =>
                    'author' in item ? (
                        <PostCard key={(item as Post).id} post={item as Post} />
                    ) : (
                        <AdCard key={`ad-${(item as Ad).id}`} ad={item as Ad} />
                    )
                )}
            </div>
        </div>
    );
};

export default Feed;
