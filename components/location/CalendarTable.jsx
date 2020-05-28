import Hidden from '@material-ui/core/Hidden';
import TablePortrait from './TablePortrait';
import TableLandscape from './TableLandscape';

export default (props) => (
    <>
        <Hidden mdUp>
            <TablePortrait {...props} />
        </Hidden>
        <Hidden smDown>
            <TableLandscape {...props} />
        </Hidden>
    </>
);
