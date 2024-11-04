import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#F74D4D',
        },
        background: {
            default: '#0B0B0B',
            paper: '#181818',
        },
        grey: {

            500: '#575757',
            600: '#ABABAB',
            700: "#6A6A6A"
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#BCBCBC',
        },
        success: {
            main: '#56C05A',
        },
    }
});

export default customTheme;
