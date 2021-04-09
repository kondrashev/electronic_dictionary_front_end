import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PaginationButtonsWords = (props) => {
    const { setNumberPageWord, currentNameCategory, setGetContent, countWords, setLoadWords } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            setNumberPageWord(value);
            setGetContent([]);
            setLoadWords(value);
        }
    }
    return (
        <Pagination
            count={countWords}
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