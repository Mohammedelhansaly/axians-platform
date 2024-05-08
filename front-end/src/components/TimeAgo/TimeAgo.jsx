import React, { useState, useEffect } from 'react';

function TimeAgo({ createdAt }) {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calculateTimeAgo = () => {
            const currentTime = new Date();
            const diffInMilliseconds = currentTime - new Date(createdAt);
            const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
            if (diffInMinutes < 60) {
                setTimeAgo(`${diffInMinutes} minutes ago`);
            } else {
                const diffInHours = Math.round(diffInMinutes / 60);
                setTimeAgo(`${diffInHours} hours ago`);
            }
        };

        calculateTimeAgo();

        // Update time every minute
        const interval = setInterval(calculateTimeAgo, 60000);

        return () => clearInterval(interval);
    }, [createdAt]);

    return <span style={{ fontSize: '10px', color: '#99A1B7', marginTop: '5px' }}>{timeAgo}</span>;
}

export default TimeAgo;
