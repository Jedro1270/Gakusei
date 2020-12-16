import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../Helper Functions/verifyToken';

export default function Chat(props) {

    const token = useSelector((state) => { return state.tokenState });
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        verifyToken(token, history);
    }, []);

    dispatch(changeTitle('Chat'));

    return (
        <div className="Chat-page">
            chat stuff here
        </div>
    );
}