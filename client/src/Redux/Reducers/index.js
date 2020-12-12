import { combineReducers } from 'redux';

import headerTitleReducer from './HeaderTitle';
import headerNavigationReducer from './HeaderNavigation';
import userStateReducer from './UserState';

const allReducers = combineReducers({
    headerTitle: headerTitleReducer,
    headerNavigation: headerNavigationReducer,
    userState: userStateReducer
});

export default allReducers;