import React from 'react';
import { Post } from '../types';
import { CommentIcon, ImageIcon, LikeIcon, ShareIcon, VideoIcon } from './Icons';
import VerifiedBadge from './VerifiedBadge';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const PostIcon = () => {
        switch (post.type) {
            case 'image':
                return <ImageIcon className="h-5 w-5 text-gray-400" />;
            case 'video':
                return <VideoIcon className="h-5 w-5 text-gray-400" />;
            default:
                return null;
        }
    };
    
    return (
        <div className="bg-neutral rounded-lg shadow-lg p-5 border border-gray-700">
            {/* Header */}
            <div className="flex items-center mb-4">
                <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                    <div className="flex items-center">
                        <p className="font-bold text-white">{post.author}</p>
                        {post.verified && <VerifiedBadge className="ml-2 h-5 w-5" />}
                    </div>
                    <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
                <div className="flex-shrink-0">
                    <PostIcon />
                </div>
            </div>

            {/* Content */}
            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

            {/* Media */}
            {post.type === 'image' && post.mediaUrl && (
                <img src={post.mediaUrl} alt="Post media" className="rounded-lg w-full object-cover mb-4 border border-gray-600" />
            )}
            {post.type === 'video' && post.thumbnailUrl && (
                <div className="relative mb-4 cursor-pointer group">
                    <img src={post.thumbnailUrl} alt="Video thumbnail" className="rounded-lg w-full object-cover border border-gray-600" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <div className="bg-primary text-white rounded-full p-4 transform transition-transform group-hover:scale-110">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Actions */}
            <div className="flex justify-between items-center text-gray-400 border-t border-gray-700 pt-3">
                <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                    <CommentIcon className="h-6 w-6" /> <span className="text-sm font-semibold">Comment</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-pink-500 transition-colors">
                    <LikeIcon className="h-6 w-6" /> <span className="text-sm font-semibold">Like</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                    <ShareIcon className="h-6 w-6" /> <span className="text-sm font-semibold">Share</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
