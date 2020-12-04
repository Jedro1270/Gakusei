import { Typography, styled } from '@material-ui/core';

export default function Title(props) {
    return (
        <TitleComponent>
            {props.title}
        </TitleComponent>
    );
}

const TitleComponent = styled(Typography)({
    fontSize: '30px',
    margin: '20px',
    fontWeight: 'bold'
});