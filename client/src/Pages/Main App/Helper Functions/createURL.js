export default function createURL(name) {
    return name.split(' ').join('-').toLowerCase();
}