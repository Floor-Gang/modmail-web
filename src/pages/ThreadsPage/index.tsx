import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress, Container, Paper, Typography } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { Category, Thread } from 'modmail-types';
import { MembersState, NavigationState } from '../../state';
import LocalizedBackdrop from '../../components/LocalizedBackdrop';
import ThreadsContainer from '../../components/ThreadsContainer';
import ThreadListItem from '../../components/ThreadListItem';
import { MemberState, Nullable } from '../../types';

type ThreadsPageParams = {
    categoryId: string;
};

const useStyle = makeStyles(() => ({
    root: {
        position: 'relative',
        minHeight: '80vh',
        padding: '1rem',
    },
    title: { padding: '.5rem' },
}));

function ThreadsPage(): JSX.Element {
    const { t } = useTranslation('pages');
    const classes = useStyle();
    const { categoryId } = useParams<ThreadsPageParams>();
    const history = useHistory();
    const { threads, categories } = NavigationState.useContainer();
    const { getMember } = MembersState.useContainer();
    const [category, setCategory] = useState<Category | null>(null);
    const isThreadsLoaded = threads.items instanceof Array;

    // useEffect(() => {
    //     if (members === null) {
    //         fetchMembers(categoryId);
    //     } else {
    //         console.log(members);
    //     }
    // }, [members]);

    useEffect(() => {
        setCategory(categories.findById(categoryId));
    }, [categoryId]);

    useEffect(() => {
        console.log(threads);
        if (typeof threads.items === 'undefined' && typeof categoryId !== 'undefined') {
            threads.fetch(categoryId);
        }
    }, [threads.items]);

    const handleFetchMember = (id?: string): Promise<Nullable<MemberState>> =>
        id ? getMember.call(null, categoryId, id) : Promise.resolve(null);

    const onThreadClicked = (evt: React.SyntheticEvent, thread: Thread) => {
        console.log({ evt, thread });
        history.push(`/category/${categoryId}/${thread.id}`);
    };

    const renderLoading = (
        <LocalizedBackdrop open fadeOut>
            <CircularProgress />
        </LocalizedBackdrop>
    );

    return (
        <Container className={classes.root}>
            <Paper>
                <Typography variant={'h2'} className={classes.title}>
                    <Trans
                        i18nKey={'category.title'}
                        ns={'pages'}
                        tOptions={{
                            category: category ? category.name : 'Unknown',
                        }}
                    />
                </Typography>
            </Paper>
            {isThreadsLoaded ? (
                <ThreadsContainer
                    threads={threads.items}
                    fetchMember={handleFetchMember}
                    itemProps={{
                        full: true,
                        style: { height: 150 },
                        replied: true,
                        onClick: onThreadClicked,
                    }}
                    empty={{
                        title: t('category.noThreadsTitle'),
                        description: t('category.noThreadsDesc'),
                    }}
                >
                    {ThreadListItem}
                </ThreadsContainer>
            ) : (
                renderLoading
            )}
        </Container>
    );
}

export default ThreadsPage;
