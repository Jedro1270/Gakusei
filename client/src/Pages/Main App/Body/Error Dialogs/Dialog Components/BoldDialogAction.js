import { styled, Typography } from '@material-ui/core';

export default function BoldDialogAction(props) {
    return (
        <BoldDialogActionBody>
            {props.content}
        </BoldDialogActionBody>
    );
}

const BoldDialogActionBody = styled(Typography)({
    fontWeight: 'bold'
});