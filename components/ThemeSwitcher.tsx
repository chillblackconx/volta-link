import React, { useContext, useState, useRef, useEffect } from 'react';
import { VoltaContext } from '../contexts/VoltaContext';
import { PaintBrushIcon } from './Icons';

const THEME_OPTIONS = [
    { id: 'default', name: 'Default', color: '#4F46E5' },
    { id: 'crimson', name: 'Crimson', color: '#DC2626' },
    { id: 'ocean', name: 'Ocean', color: '#14B8A6' },
    { id: 'forest', name: 'Forest', color: '#16A34A' },
];

const ThemeSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(VoltaContext);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    if (!context) return null;
    const { setTheme } = context;

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 rounded-full hover:bg-base-100 transition-colors"
                aria-label="Change theme"
            >
                <PaintBrushIcon className="h-6 w-6 text-gray-300" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral rounded-lg shadow-lg p-2 z-20 border border-gray-700">
                    <p className="text-xs text-gray-400 px-2 pb-2 font-semibold">Select Theme</p>
                    {THEME_OPTIONS.map(opt => (
                        <button 
                            key={opt.id} 
                            onClick={() => handleThemeChange(opt.id)} 
                            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-base-100 flex items-center transition-colors text-gray-200"
                        >
                            <div className="w-4 h-4 rounded-full mr-3 border border-gray-500" style={{ backgroundColor: opt.color }}></div>
                            <span>{opt.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThemeSwitcher;
