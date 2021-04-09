import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PaginationButtonsCategories = (props) => {
    const { setNumberPageCategory, countCategories, setGetContent, setLoadCategories } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            setNumberPageCategory(value);
            setGetContent([]);
            setLoadCategories(value);
        }
    }
    return (
        <Pagination
            count={countCategories}
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
export default PaginationButtonsCategories;