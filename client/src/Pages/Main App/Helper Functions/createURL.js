export default function createURL(name) {
    return name.replaceAll(' ', '-').toLowerCase();
}