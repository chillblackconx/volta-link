import React, { useState, useEffect, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { VoltaContext } from './contexts/VoltaContext';
import { ViewType, Feature, VoltaContextType } from './types';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import FeaturesPage from './components/FeaturesPage';

const INITIAL_FEATURES: Feature[] = [
    { id: 'verified_badge', title: 'Verified Badge', description: 'Get a verified badge next to your name to stand out.', pointsCost: 1000, unlocked: false },
    { id: 'post_analytics', title: 'Post Analytics', description: 'Access detailed analytics for your posts.', pointsCost: 2500, unlocked: false },
    { id: 'custom_theme', title: 'Custom Profile Theme', description: 'Personalize your profile page with a unique theme.', pointsCost: 5000, unlocked: false },
];

function AppContent() {
    const { user, loading } = useAuth();
    const [currentView, setCurrentView] = useState<ViewType>('feed');
    const [theme, setTheme] = useState('default');
    const [points, setPoints] = useState(500);
    const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const addPoints = (amount: number) => setPoints(prev => prev + amount);
    
    const unlockFeature = (featureId: string) => {
        const feature = features.find(f => f.id === featureId);
        if (feature && !feature.unlocked && points >= feature.pointsCost) {
            setPoints(prev => prev - feature.pointsCost);
            setFeatures(prev => prev.map(f => f.id === featureId ? { ...f, unlocked: true } : f));
        }
    };

    const voltaContextValue: VoltaContextType = useMemo(() => ({
        theme, setTheme, points, addPoints, features, unlockFeature
    }), [theme, points, features]);

    if (loading) {
        return <div className="min-h-screen bg-base flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user) {
        return <LoginPage />;
    }
    
    return (
        <VoltaContext.Provider value={voltaContextValue}>
            <div className="min-h-screen bg-base text-gray-200 flex flex-col">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                        {currentView === 'feed' && <Feed />}
                        {currentView === 'features' && <FeaturesPage />}
                    </main>
                </div>
            </div>
        </VoltaContext.Provider>
    );
}

const App: React.FC = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;
