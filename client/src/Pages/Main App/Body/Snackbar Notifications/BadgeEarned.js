import { Snackbar } from '@material-ui/core';

export default function BadgeEarned(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.openSnackbar}
            onClose={() => {props.setOpenSnackbar(false)}}
            message={`You have earned the ${props.badgeTitle} badge!`}
            autoHideDuration={6000}
        />
    );
}