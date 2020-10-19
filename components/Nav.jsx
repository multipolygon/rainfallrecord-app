/* global URL */
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { UserContext } from './User';
import Link from './Link';

export default function Nav() {
    const router = useRouter();
    const variant = (href) => (href.includes(router.pathname) ? 'contained' : 'outlined');

    const locationId = () => {
        if (typeof window === 'object') {
            let url;
            try {
                url = new URL(window.location);
            } catch (e) {
                // pass
            }
            if (url) {
                const query = queryString.parse(url.search);
                if (query.id) {
                    if (query.id === '0') {
                        return 'Demo';
                    }
                    return `#${query.id}`;
                }
            }
        }
        return '#';
    };

    return (
        <ButtonGroup size="small">
            <Link component={Button} href="/" variant={variant(['/'])}>
                Home
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
            <Link
                component={Button}
                href="/locations"
                as="/locations"
                variant={variant(['/locations'])}
            >
                Locations
            </Link>
            {router.pathname === '/location' && (
                <Link component={Button} href="/location" as={router.asPath} variant="contained">
                    {locationId()}
                </Link>
            )}
        </ButtonGroup>
    );
}
