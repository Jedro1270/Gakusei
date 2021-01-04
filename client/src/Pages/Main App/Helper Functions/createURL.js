const createURL = (name) => {
    return name.replaceAll(' ', '-').toLowerCase();
}

export default createURL;