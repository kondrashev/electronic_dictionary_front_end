import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PaginationButtonsWords = (props) => {
    const { values, setValues } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            setValues({
                ...values,
                numberPageWord: value,
                getContent: [],
                loadWords: value
            });
        }
    }
    return (
        <Pagination
            count={values.countWords}
            variant="outlined"
            onChange={handleChange}
            shape="rounded"
            style={{
                position: 'fixed',
                bottom: '0px',
                left: '50%',
                transform: 'translate(-50%,-100%)',
            }}
        />
    )
}
export default PaginationButtonsWords;