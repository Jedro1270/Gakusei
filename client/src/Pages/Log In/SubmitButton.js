import { Button, styled } from '@material-ui/core';

export default function SubmitButton(props) {

    return (
        <SubmitButtonComponent fullWidth onClick={() => {props.submit()}}>
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
        backgroundColor: 'rgb(89, 89, 89)'
    }
});