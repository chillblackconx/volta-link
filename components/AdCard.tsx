
import React from 'react';
import { Ad } from '../types';

const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
    return (
        <div className="bg-neutral rounded-lg shadow-lg p-5 border-2 border-dashed border-secondary">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Advertisement</p>
                    <h3 className="font-bold text-white mt-1 text-lg">{ad.title}</h3>
                </div>
                <p className="text-sm font-medium text-secondary flex-shrink-0 ml-4">{ad.company}</p>
            </div>
            <p className="text-gray-400 my-3">{ad.content}</p>
            <button className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200">
                {ad.cta}
            </button>
        </div>
    );
};

export default AdCard;
