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
                {user === null ? (
                    <Button component="a" href="//api.rainfallrecord.localhost/login">
                        Log In
                    </Button>
                ) : (
                    <Link component={Button} href="/user" as="/user/">
                        {user.username}
                    </Link>
                )}
            </ButtonGroup>
        )}
    </UserContext.Consumer>
);
