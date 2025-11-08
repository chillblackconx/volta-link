
import React from 'react';
import { ViewType } from '../types';
import { HomeIcon, SparklesIcon } from './Icons';

interface SidebarProps {
    currentView: ViewType;
    setCurrentView: (view: ViewType) => void;
}

const NavLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-300 hover:bg-neutral hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    return (
        <aside className="w-64 bg-neutral p-4 flex-shrink-0 hidden md:block border-r border-gray-700">
            <nav className="space-y-2">
                <NavLink
                    icon={<HomeIcon className="h-6 w-6" />}
                    label="Feed"
                    isActive={currentView === 'feed'}
                    onClick={() => setCurrentView('feed')}
                />
                <NavLink
                    icon={<SparklesIcon className="h-6 w-6" />}
                    label="Features"
                    isActive={currentView === 'features'}
                    onClick={() => setCurrentView('features')}
                />
            </nav>
        </aside>
    );
};

export default Sidebar;
