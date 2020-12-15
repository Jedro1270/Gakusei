import { combineReducers } from 'redux';

import headerTitleReducer from './HeaderTitle';
import headerNavigationReducer from './HeaderNavigation';
import tokenStateReducer from './TokenState';

const allReducers = combineReducers({
    headerTitle: headerTitleReducer,
    headerNavigation: headerNavigationReducer,
    tokenState: tokenStateReducer
});

export default allReducers;