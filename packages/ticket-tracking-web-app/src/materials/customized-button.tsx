import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const CustomizedButton = withStyles({
    root: {
        textTransform: 'none'
    }
})(Button);