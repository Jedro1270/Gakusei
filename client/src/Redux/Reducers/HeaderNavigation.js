const headerNavigationReducer = (state = 'DRAWER', action) => {
    switch (action.type) {
        case 'USE_BACK_BUTTON':
            return state = 'BACK_BUTTON';
        case 'USE_DRAWER':
            return state = 'DRAWER';
        default:
            return state;
    }
}

export default headerNavigationReducer;