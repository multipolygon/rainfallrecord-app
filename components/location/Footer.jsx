import { useState, useEffect, useContext } from 'react';
import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import ActionButton from '../ActionButton';
import DownloadButtons from './DownloadButtons';
import UserFeedbackFormDialog from '../UserFeedbackFormDialog';
import { UserContext } from '../User';

export default ({ id, src, userIsOwner }) => {
    const [user, setUser] = useContext(UserContext);
    const [showFeedback, setShowFeedback] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (
            !showFeedback &&
            userIsOwner &&
            user &&
            user.feedback_rating === null &&
            user.created_at &&
            Moment(user.created_at).isBefore(Moment().subtract(7, 'days'))
        ) {
            setShowFeedback(true);
        }
    }, [user]);

    const onDelete = () => {
        setUser(null);
        router.push('/user/');
    };

    return (
        <div className="hidden-print">
            <Grid container direction="row" justify="center" alignItems="flex-end" spacing={2}>
                {showFeedback && (
                    <Grid item>
                        <small>Feedback?</small>
                        <br />
                        <UserFeedbackFormDialog />
                    </Grid>
                )}

                <Grid item>
                    <small>Download:</small>
                    <br />
                    <DownloadButtons src={src} />
                </Grid>

                {userIsOwner && (
                    <Grid item>
                        <ActionButton
                            confirm="Really delete?"
                            url={`/locations/${id}.json`}
                            method="DELETE"
                            onSuccess={onDelete}
                            color="secondary"
                        >
                            Delete
                        </ActionButton>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};
