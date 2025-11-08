import React, { useState, useContext } from 'react';
import { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { VoltaContext } from '../contexts/VoltaContext';

interface CreatePostProps {
    onPostCreated: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const { user } = useAuth();
    const voltaContext = useContext(VoltaContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !user) return;

        const newPost: Post = {
            id: Date.now(),
            type: 'text',
            author: user.displayName || 'Anonymous',
            avatarUrl: user.photoURL || `https://i.pravatar.cc/48?u=${user.uid}`,
            content: content.trim(),
            timestamp: 'Just now',
            verified: voltaContext?.features.find(f => f.id === 'verified_badge')?.unlocked,
        };

        onPostCreated(newPost);
        setContent('');
        voltaContext?.addPoints(10); // Add points for posting
    };

    if (!user) return null;

    return (
        <div className="bg-neutral p-4 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-start space-x-4">
                <img
                    src={user.photoURL || `https://i.pravatar.cc/48?u=${user.uid}`}
                    alt="Your avatar"
                    className="w-12 h-12 rounded-full"
                />
                <form onSubmit={handleSubmit} className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full bg-base-100 text-gray-200 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none transition"
                        rows={3}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            disabled={!content.trim()}
                            className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-focus transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
