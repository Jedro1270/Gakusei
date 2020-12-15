const tokenStateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return state = action.payload;
        default:
            return state;
    }
}

export default tokenStateReducer;