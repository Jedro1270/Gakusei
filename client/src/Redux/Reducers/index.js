import { combineReducers } from 'redux';

import headerTitleReducer from './HeaderTitle';
import headerNavigationReducer from './HeaderNavigation';

const allReducers = combineReducers({
    headerTitle: headerTitleReducer,
    headerNavigation: headerNavigationReducer
});

export default allReducers;