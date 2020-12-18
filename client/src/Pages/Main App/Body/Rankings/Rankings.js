import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../Helper Functions/verifyToken';

export default function Rankings() {

    const dispatch = useDispatch();

    const token = useSelector((state) => { return state.tokenState });
    const history = useHistory();

    useEffect(() => {
        verifyToken(token, history);
    }, [token, history]);

    dispatch(changeTitle('Rankings and Badges'));

    return (
        <div className="Rankings-page">
            rankings stuff here
        </div>
    );
}