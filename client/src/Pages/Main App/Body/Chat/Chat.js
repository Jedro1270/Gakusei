import React, { useEffect } from 'react';

export default function Chat(props) {
    
    useEffect(() => {
        props.setTitle('Chat');
    });

    return (
        <div className="Chat-page">
            chat stuff here
        </div>
    );
}