import React, { useEffect, useState } from 'react';
import { Backdrop, Fade } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: fade('#000', 0.3),
        zIndex: 1000,
        opacity: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    open: {
        opacity: 0.2,
    },
}));

type BackdropProps = {
    children: JSX.Element;
    open?: boolean;
    onClick?: (evt: React.SyntheticEvent<HTMLDivElement>) => any;
};
export default function LocalizedBackdrop(props: BackdropProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open) setTimeout(() => setOpen(props.open as boolean), 225);
        else setOpen(props.open as boolean);
    }, [props.open]);

    if (!open) return <React.Fragment />;
    return (
        <Fade in={props.open}>
            <div onClick={props.onClick} className={clsx(classes.root, classes.open)}>
                {props.children}
            </div>
        </Fade>
    );
}

LocalizedBackdrop.defaultProps = {
    open: false,
};
