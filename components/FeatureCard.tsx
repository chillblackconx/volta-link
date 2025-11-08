import React, { useContext } from 'react';
import { Feature } from '../types';
import { VoltaContext } from '../contexts/VoltaContext';
import { SparklesIcon } from './Icons';

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
    const context = useContext(VoltaContext);

    if (!context) return null;
    const { points, unlockFeature } = context;

    const canUnlock = points >= feature.pointsCost;

    return (
        <div className={`bg-neutral rounded-lg shadow-lg p-6 border border-gray-700 flex flex-col ${feature.unlocked ? 'opacity-70' : ''}`}>
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            <p className="text-gray-400 mt-2 flex-grow">{feature.description}</p>
            <div className="mt-6">
                {feature.unlocked ? (
                    <div className="text-center font-bold py-2 px-4 rounded-lg bg-green-500 bg-opacity-20 text-green-400 border border-green-500">
                        Unlocked
                    </div>
                ) : (
                    <button 
                        onClick={() => unlockFeature(feature.id)}
                        disabled={!canUnlock}
                        className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-focus transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <span className="mr-2">Unlock for</span>
                        <SparklesIcon className="h-5 w-5 text-yellow-300" />
                        <span className="ml-1">{feature.pointsCost}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;
