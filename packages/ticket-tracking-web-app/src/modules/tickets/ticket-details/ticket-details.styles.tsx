import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
    sectionHeader: {
        position: 'relative' as any,
        borderBottom: '1px solid #e0e0e0',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    sectionHeaderButtons: {
        position: "absolute" as any,
        right: '50px',
        'text-align': 'right',
        '& button, & a': {
            marginLeft: '15px',
            'text-transform': 'none'
        }
    },
    sectionContainer: {
        padding: `${theme.spacing(1)}px ${theme.spacing(6)}px`
    },
    dataTitle: {
        margin: '20px 0 0'
    },
    dataTitleSuffix:{
        display: 'inline-block',
        marginBottom: '20px',
        fontSize: '12px'
    },
    dataChips: {
        marginBottom: '20px',
        '&>div': {
            marginRight: '10px',
            'font-weight': 'bold'
        }
    },
    dataFieldTitle: {
        'font-weight': 'bold'
    },
    dataText: {
        marginBottom: '20px',
        'text-indent': '30px'
    },
    commentsList: {
        '& li:not(:first-child)': {
            borderTop: '1px dashed #cbcbcb'
        },
        '& li:last-child': {
            borderTop: 'none'
        }
    },
    commentItem: {
        margin: '15px 47px',
        width: 'auto'
    },
    commentItemIcon: {
        fontSize: '2em' as any,
        color: '#cbcbcb'

    },
    commentForm: {
        width: '100%'
    },
    inputGroup: {
        margin: "10px 30px 15px 30px"
    },
    formAction: {
        'text-align': 'right',
        margin: '0 30px 30px 30px',
        '& button': {
            marginLeft: '30px',
            textTransform: 'none' as any
        }
    },
    formError: {
        color: '#f44336'
    },
    deleteModal: {
        background: '#fff',
        width: "30%",
        height: "auto",
        padding: "30px",
        borderRadius: "4px",
        marginLeft: "35%",
        position: "relative" as any,
        marginTop: "150px",
        border: "none",
        textAlign: "center" as any,
    },
    modalButtons: {
        marginTop: '20px',
        '& button': {
            marginRight: '15px',
            textTransform: 'none' as any
        }
    },
    modalErrorText: {
        color: '#a55752',
        marginTop: '15px',
        fontSize: '12px'
    }
});
