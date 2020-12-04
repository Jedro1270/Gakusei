import { Button, styled } from '@material-ui/core';

export default function SubmitButton(props) {
    return (
        <SubmitButtonComponent  type="submit" fullWidth>
            {props.text}
        </SubmitButtonComponent>
    );
}

const SubmitButtonComponent = styled(Button)({
    variant: 'contained',
    marginTop: '10px',
    marginBottom: '30px',
    padding: '10px',
    backgroundColor: 'grey',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgb(153, 153, 153)'
    }
});