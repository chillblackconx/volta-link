
import React, { useContext } from 'react';
import { VoltaContext } from '../contexts/VoltaContext';
import FeatureCard from './FeatureCard';

const FeaturesPage: React.FC = () => {
    const context = useContext(VoltaContext);

    if (!context) return null;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Unlock Features</h2>
            <p className="text-gray-400 mb-8">Use your points to enhance your Volta Link experience.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {context.features.map(feature => (
                    <FeatureCard key={feature.id} feature={feature} />
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
