const changeTitle = (newTitle) => {
    return {
        type: 'CHANGE',
        payload: newTitle
    }
}

export default changeTitle;