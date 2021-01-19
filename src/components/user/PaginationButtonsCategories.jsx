import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { getNewContent } from './Functions';

const PaginationButtonsCategories = (props) => {
    const { setNumberPageCategory, countCategories, setGetContent } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            setNumberPageCategory(value);
            setGetContent([]);
            let data = {
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${value - 1}`}`,
                setGetContent: setGetContent
            }
            getNewContent(data);
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