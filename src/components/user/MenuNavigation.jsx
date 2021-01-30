import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getCountPages } from './Functions';

const MenuNavigation = (props) => {
    const { setShowListCategories, setShowListWords, showListWords,
        setCurrentNameCategory, currentNameCategory, setShowSearchWord,
        showSearchWord, valueSearchWord, setGetContent,
        searchWord, setCountWords, numberPageCategory } = props;
    async function listCategories() {
        setGetContent([]);
        setShowListCategories(true);
        setShowListWords(false);
        setShowSearchWord(false);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${numberPageCategory - 1}`}`);
        response = await response.json();
        setGetContent(response);
    }
    async function currentCategory() {
        setCurrentNameCategory(searchWord.categoryName);
        setShowListCategories(false);
        setShowSearchWord(false);
        setShowListWords(true);
        setGetContent([]);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${0}&categoryName=${searchWord.categoryName}&userName=${sessionStorage.userName}`}`);
        response = await response.json();
        setGetContent(response);
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${searchWord.categoryName}&userName=${sessionStorage.userName}`}`,
            range: 24,
            setCountWords: setCountWords
        }
        getCountPages(data);
    }
    return (
        <div
            style={{
                width: '300px',
                position: 'absolute',
                top: '80px',
                left: '50%',
                transform: 'translate(-50%,0)'
            }}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                <Link
                    style={{
                        cursor: 'pointer'
                    }}
                    color="inherit"
                    onClick={listCategories}
                >
                    Categories
                </Link>
                {
                    showSearchWord === true &&
                    <Link
                        style={{
                            cursor: 'pointer'
                        }}
                        color="inherit"
                        onClick={currentCategory}
                    >
                        {searchWord.categoryName}
                    </Link>
                }
                <Typography
                    color="textPrimary"
                >
                    {
                        showListWords === true &&
                        currentNameCategory
                    }
                    {
                        showSearchWord === true &&
                        valueSearchWord
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
export default MenuNavigation;