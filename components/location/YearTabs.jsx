import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Moment from 'moment';

export default ({ data, mode, yearLabels, year, setYear }) => {
    const yearTabsRef = useRef();

    useEffect(() => {
        const div = yearTabsRef.current;
        if (div) {
            const i = yearLabels.indexOf(year);
            if (i !== -1) {
                const left = (div.scrollWidth / yearLabels.length) * i;
                if (left < div.scrollLeft || left > div.scrollLeft + div.offsetWidth) {
                    yearTabsRef.current.scrollLeft = left;
                }
            }
        }
    }, [year, yearLabels, yearTabsRef.current]);

    return (
        <Grid container>
            <Grid item xs={2} sm={1} style={{ textAlign: 'right' }}>
                <IconButton onClick={() => setYear(year - 1)}>
                    <ChevronLeftIcon />
                </IconButton>
            </Grid>
            <Grid item xs={8} sm={10}>
                <div
                    style={{ textAlign: 'center', width: '100%', overflowX: 'auto' }}
                    ref={yearTabsRef}
                >
                    <ButtonGroup size="small">
                        {yearLabels.map((y) => (
                            <Button
                                key={y}
                                onClick={() => setYear(y)}
                                variant={y === year ? 'contained' : 'outlined'}
                                style={{
                                    opacity:
                                        data[mode] === undefined || data[mode][y] === undefined
                                            ? 0.5
                                            : 1,
                                }}
                            >
                                {y}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </Grid>
            <Grid item xs={2} sm={1} style={{ textAlign: 'left' }}>
                <IconButton onClick={() => (Moment().year() > year ? setYear(year + 1) : null)}>
                    <ChevronRightIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
