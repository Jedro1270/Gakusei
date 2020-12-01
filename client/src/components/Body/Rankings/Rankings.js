import React, { useEffect } from 'react';

export default function Rankings(props) {
    
    useEffect(() => {
        props.setTitle('Rankings and Badges')
    });

    return (
        <div className="Rankings-page">
            rankings stuff here
        </div>
    );
}