import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useRouter } from 'next/router';
import { UserContext } from './User';
import Link from './Link';

export default function Nav() {
    const router = useRouter();
    const variant = (href) => (href.includes(router.pathname) ? 'contained' : 'outlined');

    return (
        <ButtonGroup size="small">
            <Link component={Button} href="/" variant={variant(['/'])}>
                Home
            </Link>
            <Link
                component={Button}
                href="/locations"
                as="/locations"
                variant={variant(['/locations', '/location'])}
            >
                Locations
            </Link>
            <Link component={Button} href="/user" as="/user" variant={variant(['/user'])}>
                <UserContext.Consumer>
                    {([user]) =>
                        (user === null && '[Loading]') ||
                        (user === false && '[Offline]') ||
                        (user && user.username) ||
                        'Log In / Sign Up'
                    }
                </UserContext.Consumer>
            </Link>
        </ButtonGroup>
    );
}
