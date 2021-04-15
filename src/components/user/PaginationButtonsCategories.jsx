import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { ApplictationContext } from '../Application';

const PaginationButtonsCategories = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            setValues({
                ...values,
                numberPageCategory: value,
                getContent: [],
                loadCategories: value
            });
        }
    }
    return (
        <Pagination
            count={values.countCategories}
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