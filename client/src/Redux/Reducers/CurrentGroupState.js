const currentGroupStateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_GROUP':
            return state = action.payload;
        default:
            return state;
    }
}

export default currentGroupStateReducer;