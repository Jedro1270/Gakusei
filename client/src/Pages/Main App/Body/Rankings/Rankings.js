import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';

export default function Rankings(props) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(changeTitle('Rankings and Badges'));
    });

    return (
        <div className="Rankings-page">
            rankings stuff here
        </div>
    );
}