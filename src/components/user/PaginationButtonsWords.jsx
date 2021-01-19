import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { getNewContent } from './Functions';

const PaginationButtonsWords = (props) => {
    const { showListCategories, showListWords, setNumberPageCategory, setNumberPageWord,
        currentNameCategory, setGetContent, countWords } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            if (showListCategories === true) {
                setNumberPageCategory(value);
                setGetContent([]);
                let data = {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${value - 1}`}`,
                    setGetContent: setGetContent
                }
                getNewContent(data);
            } else if (showListWords === true) {
                setNumberPageWord(value);
                setGetContent([]);
                let data = {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${value - 1}&categoryName=${currentNameCategory}&userName=${sessionStorage.userName}`}`,
                    setGetContent: setGetContent
                }
                getNewContent(data);
            }
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