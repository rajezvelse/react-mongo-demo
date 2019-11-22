import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
    sectionHeader: {
        position: 'relative' as any,
        borderBottom: '1px solid #e0e0e0',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    sectionContainer: {
        padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`
    },
    inputGroup: {
        margin: "30px"
    },
    formAction: {
        'text-align': 'right',
        margin: '30px',
        '& button, & a': {
            marginLeft: '30px',
            'text-transform': 'none'
        }
    },
    formError: {
        color: '#f44336'
    }
});