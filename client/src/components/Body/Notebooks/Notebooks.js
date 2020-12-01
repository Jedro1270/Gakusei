import React, { useEffect } from 'react';

export default function Notebooks(props) {

    useEffect(() => {
        props.setTitle('Notebooks');
    });

    return (
        <div className="Notebooks-page">
            <div className="Notebook">
                <h1>
                    Notebook 1
                </h1>
            </div>
            <div className="Notebook">
                <h1>
                    Notebook 2
                </h1>
            </div>
            <div className="Notebook">
                <h1>
                    Notebook 3
                </h1>
            </div>
        </div>
    );
}