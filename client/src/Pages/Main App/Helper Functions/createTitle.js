const createTitle = (name) => {
    return name
        .replaceAll('-', ' ')
        .split(' ')
        .map((word) => {
            const firstLetter = word[0].toUpperCase();
            return `${firstLetter}${word.slice(1)} `
        });
}

export default createTitle;