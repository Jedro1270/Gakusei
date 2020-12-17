import { combineReducers } from 'redux';

import headerTitleReducer from './HeaderTitle';
import headerNavigationReducer from './HeaderNavigation';
import tokenStateReducer from './TokenState';
import userStateReducer from './UserState';
import currentGroupStateReducer from './CurrentGroupState';

const allReducers = combineReducers({
    headerTitle: headerTitleReducer,
    headerNavigation: headerNavigationReducer,
    tokenState: tokenStateReducer,
    userState: userStateReducer,
    currentGroupState: currentGroupStateReducer
});

export default allReducers;