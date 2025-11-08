import React, { useContext, useState, useRef, useEffect } from 'react';
import { VoltaContext } from '../contexts/VoltaContext';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/firebaseService';
import ThemeSwitcher from './ThemeSwitcher';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
    const voltaContext = useContext(VoltaContext);
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="bg-neutral p-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center">
                <SparklesIcon className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-white ml-2">Volta</h1>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center bg-base-100 px-3 py-1.5 rounded-full">
                    <SparklesIcon className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-semibold ml-2">{voltaContext?.points} Points</span>
                </div>
                <ThemeSwitcher />
                {user && (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img 
                                src={user.photoURL || `https://i.pravatar.cc/40?u=${user.uid}`} 
                                alt={user.displayName || 'User Avatar'}
                                className="w-10 h-10 rounded-full border-2 border-primary"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral rounded-lg shadow-lg py-1 z-20 border border-gray-700">
                                <div className="px-4 py-2 border-b border-gray-700">
                                    <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-base-100 hover:text-white"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
