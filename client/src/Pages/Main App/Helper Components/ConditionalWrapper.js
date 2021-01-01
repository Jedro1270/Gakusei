export default function ConditionalWrapper(props) {
    if (props.condition) {
        return props.wrapper(props.children);
    } else {
        return props.children;
    }
}