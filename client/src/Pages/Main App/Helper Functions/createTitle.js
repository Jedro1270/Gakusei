export default function createTitle(name) {
    const excludedWords = ['the', 'and', 'with', 'from'];

    return name
        .replaceAll('-', ' ')
        .split(' ')
        .map((word, index) => {
            if ((word.length > 2 && !excludedWords.includes(word)) || index === 0) {
                const firstLetter = word[0].toUpperCase();
                return `${firstLetter}${word.slice(1)}`
            } 

            return word;
        })
        .join(' ');
}