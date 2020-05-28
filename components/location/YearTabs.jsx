import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useRef, useEffect } from 'react';

export default ({ data, yearLabels, selectedDate, setSelectedDate }) => {
    const yearTabsRef = useRef();

    useEffect(() => {
        const div = yearTabsRef.current;
        if (div) {
            const i = yearLabels.indexOf(selectedDate.year);
            if (i !== -1) {
                const left = (div.scrollWidth / yearLabels.length) * i;
                if (left < div.scrollLeft || left > div.scrollLeft + div.offsetWidth) {
                    yearTabsRef.current.scrollLeft = left;
                }
            }
        }
    }, [selectedDate.year, yearLabels, yearTabsRef.current]);

    return (
        <div style={{ textAlign: 'center', overflowX: 'auto' }} ref={yearTabsRef}>
            <ButtonGroup size="small">
                {yearLabels.map((y) => (
                    <Button
                        key={y}
                        onClick={() => setSelectedDate({ ...selectedDate, year: y })}
                        variant={y === selectedDate.year ? 'contained' : 'outlined'}
                        disabled={data.records[y] === undefined}
                    >
                        {y}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};
