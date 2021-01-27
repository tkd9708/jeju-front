import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        background: 'white',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#ef6c00',
        height: 48,
        padding: '0 10px',
        outline: 'none!important',
        width: 100,
    },
});

export default function SubmitBtn2() {
    const classes = useStyles();
    return <Button type="submit" className={classes.root}>회원가입</Button>
}