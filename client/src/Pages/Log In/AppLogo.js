import { Box, styled } from '@material-ui/core';

export default function AppLogo() {
    return (
        <AppLogoComponent>
            <img src='/gakusei-logo.png' alt='App Logo'/>
        </AppLogoComponent>
    );
}

const AppLogoComponent = styled(Box)({
    margin: '20px 0px',
    height: 'max-content',
    width: 'max-content',
    backgroundColor: 'white'
});
