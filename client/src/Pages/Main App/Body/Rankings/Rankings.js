import React from 'react';
import { useDispatch } from 'react-redux';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';

export default function Rankings() {

    const dispatch = useDispatch();
    
    dispatch(changeTitle('Rankings and Badges'));

    return (
        <div className="Rankings-page">
            rankings stuff here
        </div>
    );
}