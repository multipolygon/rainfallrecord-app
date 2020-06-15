import Button from '@material-ui/core/Button';
import UserFormDialog from './UserFormDialog';
import { ContentBox, H3, P } from '../Typography';
import Link from '../Link';
import LogInFormDialog from './LogInFormDialog';
import ForgotUserDialog from './ForgotUserDialog';

export default () => (
    <>
        <H3>New Users:</H3>
        <ContentBox>
            <UserFormDialog newUser />
            {' or '}
            <Link
                component={Button}
                variant="outlined"
                size="small"
                href="/location"
                as="/location/?id=0"
            >
                Try a Live Demo
            </Link>
        </ContentBox>
        <P>Its free!</P>
        <H3>Existing Users:</H3>
        <ContentBox>
            <LogInFormDialog />
        </ContentBox>
        <H3>Forgot Username or Password?</H3>
        <ContentBox>
            <ForgotUserDialog />
        </ContentBox>
    </>
);
