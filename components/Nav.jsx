import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { UserContext } from './User';
import Link from './Link';

export default () => (
    <UserContext.Consumer>
        {([user]) => (
            <ButtonGroup size="small">
                <Link component={Button} href="/">
                    Home
                </Link>
                <Link component={Button} href="/locations" as="/locations/">
                    Locations
                </Link>
                <Link component={Button} href="/user" as="/user/">
                    {(user && user.username) || 'Log In / Sign Up'}
                </Link>
            </ButtonGroup>
        )}
    </UserContext.Consumer>
);
