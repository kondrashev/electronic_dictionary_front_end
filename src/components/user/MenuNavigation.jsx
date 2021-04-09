import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const MenuNavigation = (props) => {
    const { showListCategories, setShowListCategories, setShowListWords, showListWords,
        setCurrentNameCategory, currentNameCategory, setShowSearchWord,
        showSearchWord, valueSearchWord, setGetContent,
        searchWord, setCountWords, numberPageCategory,
        setLoadCategories, setLoadWords } = props;
    async function listCategories() {
        setGetContent([]);
        setShowListCategories(true);
        setShowListWords(false);
        setShowSearchWord(false);
        setLoadCategories(showListCategories);
    }
    async function currentCategory() {
        setGetContent([]);
        setCurrentNameCategory(searchWord.categoryName);
        setShowListCategories(false);
        setShowSearchWord(false);
        setShowListWords(true);
        setLoadWords(searchWord.categoryName);
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