import { styled, Typography } from '@material-ui/core';

export default function BoldDialogTitle(props) {
    return (
        <BoldDialogTitleBody>
            {props.content}
        </BoldDialogTitleBody>
    );
}

const BoldDialogTitleBody = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px'
});