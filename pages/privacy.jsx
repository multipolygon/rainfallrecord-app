import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import { ContentBox, H1, P } from '../components/Typography';

export default () => (
    <Layout title="Privacy" href="/about/">
        <H1>Privacy</H1>
        <ContentBox>
            <P>This website and app:</P>
            <Typography variant="body1" component="ul">
                <li>
                    Does not display ads and does not embed any ad tracking service code (and never
                    will)
                </li>
                <li>
                    Does not embed any kind of usage or visitor tracking code (such as Google
                    Analytics or Facebook pixel)
                </li>
                <li>
                    Does not embed any social sharing button code or images (such as Twitter or
                    Facebook like button)
                </li>
                <li>
                    Does not display any unfiltered third party content (such as user comments)
                    except for the map background tile images provided by Open Street Map
                </li>
                <li>
                    Does not itself use tracking cookies however cookies may be added by our server provider,
                    Cloudflare (please see below)
                </li>
                <li>
                    Uses industry-standard Transport Layer Security (HTTPS) to encrypt data over the
                    wire
                </li>
            </Typography>
            <P>
                Please note, this website and app data are hosted, for free, on{' '}
                <a href="https://github.com/">github.com</a> and{' '}
                <a href="https://www.cloudflare.com/">cloudflare.com</a> servers. Map background
                tiles are provided by{' '}
                <a href="https://operations.osmfoundation.org/policies/tiles/">Open Street Map</a>{' '}
                servers (proxied through Cloudflare). These servers may keep a log of your usage
                activity including such information as an anonymous unique user id, IP address, web
                browser version, device type and device operating system. Please see:
            </P>
            <Typography variant="body1" component="ul">
                <li>
                    <a href="https://www.cloudflare.com/privacypolicy/">
                        Cloudflare Privacy Policy
                    </a>
                </li>
                <li>
                    <a href="https://support.cloudflare.com/hc/en-us/articles/200170156-Understanding-the-Cloudflare-Cookies">
                        Understanding the Cloudflare Cookies
                    </a>
                </li>
                <li>
                    <a href="https://help.github.com/en/github/site-policy/github-privacy-statement">
                        GitHub Privacy Statement
                    </a>
                </li>
                <li>
                    <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy">
                        OpenStreetMap privacy policy
                    </a>
                </li>
            </Typography>
        </ContentBox>
    </Layout>
);
