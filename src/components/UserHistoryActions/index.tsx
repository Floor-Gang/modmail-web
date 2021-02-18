import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, lighten, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Theme } from '../../theme';

type Action = {
    render: JSX.Element | string;
    onClick?: (evt: React.SyntheticEvent<HTMLButtonElement>) => unknown;
    href?: string;
    className?: string;
};

type Props = {
    actions?: Action[];
};

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        // padding: '.5rem',
        // background: lighten(theme.palette.background.paper, 0.025),
    },
    title: {
        padding: '.5rem 1rem',
    },
    action: {
        justifyContent: 'start',
    },
}));

function UserHistoryActions(props: Props) {
    const { actions } = props;
    const classes = useStyle();
    const history = useHistory();

    function onClick(this: Action, evt: React.SyntheticEvent<HTMLButtonElement>) {
        if (this.onClick) this.onClick(evt);
        else {
            evt.preventDefault();
            if (this.href) {
                history.push(this.href);
            }
        }
    }

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant={'h2'}>
                Actions
            </Typography>
            <ButtonGroup fullWidth orientation={'vertical'}>
                {actions?.map((action, idx) => (
                    <Button
                        key={idx}
                        className={clsx(classes.action, action.className)}
                        href={action.href}
                        onClick={onClick.bind(action)}
                    >
                        {action.render}
                    </Button>
                ))}
            </ButtonGroup>
        </Paper>
    );
}

export type UserHistoryActionsProps = Props;
export type UserHistoryAction = Action;
export default UserHistoryActions;