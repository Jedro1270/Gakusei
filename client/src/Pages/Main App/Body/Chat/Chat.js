import React from 'react';
import { useDispatch } from 'react-redux';

import changeTitle from '../../../../Redux/Actions/ChangeTitle';

export default function Chat(props) {

    const dispatch = useDispatch();
    
    dispatch(changeTitle('Chat'));

    return (
        <div className="Chat-page">
            chat stuff here
        </div>
    );
}