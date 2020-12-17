import { LinearProgress, Box } from '@material-ui/core';

export default function LevelProgressBar(props) {
    return (
        <Box display='flex'>
            <Box width='100%'>
                <LinearProgress variant='determinate' value={props.value} />
            </Box>
        </Box>
    );
}