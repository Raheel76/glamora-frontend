import React from 'react';
import ShirtCard from './ShirtCard';

const ShirtGrid = ({ shirts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {shirts.map(shirt => (
                <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
        </div>
    );
};

export default ShirtGrid;