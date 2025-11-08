import type { User as FirebaseUser } from 'firebase/auth';

export type PostType = 'text' | 'image' | 'video';
export type ViewType = 'feed' | 'features';

export interface Post {
    id: number;
    type: PostType;
    author: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    mediaUrl?: string | null;
    thumbnailUrl?: string | null;
    verified?: boolean;
}

export interface Ad {
    id: number;
    title: string;
    company: string;
    content: string;
    cta: string;
}

export interface Feature {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    unlocked: boolean;
}

export interface VoltaContextType {
    theme: string;
    setTheme: (theme: string) => void;
    points: number;
    addPoints: (amount: number) => void;
    features: Feature[];
    unlockFeature: (featureId: string) => void;
}

export type User = FirebaseUser | null;

export interface AuthContextType {
    user: User;
    loading: boolean;
}
