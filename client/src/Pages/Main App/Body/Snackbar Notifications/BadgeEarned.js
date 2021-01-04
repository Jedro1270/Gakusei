import { Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function BadgeEarned(props) {
    const [openSnackbar, setOpenSnackbar] = useState(props.open);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            onClose={() => {setOpenSnackbar(false)}}
            message={`You have earned the ${props.badgeTitle} badge!`}
            autoHideDuration={6000}
        />
    );
}