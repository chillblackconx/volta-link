import { GoogleGenAI, Type } from "@google/genai";
import { Post } from '../types';

const generateFeedContent = async (): Promise<Post[]> => {
    try {
        // Initialize client before each call to ensure the latest API key is used.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const prompt = `Generate 8 engaging posts for a social network feed called "Volta Link". The topics should be about future technology, artificial intelligence, sustainable energy, and professional growth. The tone should be optimistic and inspiring. Create a mix of post types: 'text', 'image', and 'video'. For 'image' posts, provide a mediaUrl from picsum.photos (e.g., https://picsum.photos/seed/image-seed/600/400). For 'video' posts, provide a thumbnailUrl from picsum.photos (e.g., https://picsum.photos/seed/video-seed/600/400) and a placeholder mediaUrl. For 'text' posts, these media fields should be null. For the author, use names of famous scientists or inventors. For the avatarUrl, use a placeholder from picsum.photos with a unique seed for each (e.g., https://picsum.photos/seed/avatar-seed/48/48). For the timestamp, use a relative time like "2h ago".`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        posts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: { type: Type.STRING, description: "The type of post: 'text', 'image', or 'video'." },
                                    author: { type: Type.STRING, description: "Full name of the post's author." },
                                    avatarUrl: { type: Type.STRING, description: "A URL to a 48x48 avatar image." },
                                    content: { type: Type.STRING, description: "The text content of the post." },
                                    timestamp: { type: Type.STRING, description: "Relative time of posting, e.g., '2h ago'." },
                                    mediaUrl: { type: Type.STRING, description: "URL for the image or video. Null for text posts." },
                                    thumbnailUrl: { type: Type.STRING, description: "URL for the video thumbnail. Null for other types." },
                                },
                                required: ["type", "author", "avatarUrl", "content", "timestamp"]
                            }
                        }
                    },
                    required: ["posts"]
                }
            }
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (parsedData && Array.isArray(parsedData.posts)) {
            return parsedData.posts.map((post: any, index: number) => ({
                ...post,
                id: Date.now() + index // Ensure unique ID for React keys
            }));
        }
        throw new Error("Invalid data structure received from API.");
    } catch (error) {
        console.error("Error generating feed content, returning fallback data:", error);
        return [
            { id: 1, type: 'text', author: 'Albert Einstein', avatarUrl: 'https://picsum.photos/seed/einstein/48/48', content: 'Creativity is intelligence having fun. Let\'s build a future where our fun creations solve real-world problems.', timestamp: '1h ago' },
            { id: 2, type: 'image', author: 'Marie Curie', avatarUrl: 'https://picsum.photos/seed/curie/48/48', content: 'A stunning view of the solar arrays powering our future. Sustainable energy is not just a choice, it\'s a necessity.', timestamp: '3h ago', mediaUrl: 'https://picsum.photos/seed/solar/600/400' },
            { id: 3, type: 'video', author: 'Nikola Tesla', avatarUrl: 'https://picsum.photos/seed/tesla/48/48', content: 'Watch the mesmerizing dance of our latest robotics prototype. The future of automation is closer than you think.', timestamp: '5h ago', thumbnailUrl: 'https://picsum.photos/seed/robotics/600/400' }
        ];
    }
};

export { generateFeedContent };
