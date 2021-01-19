import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getCountPages } from './Functions';

const MenuNavigation = (props) => {
    const { setGetContent, setShowListCategories,
        setShowListWords, setShowSearchWord,
        setCurrentNameCategory, setCountItems } = props;
    async function listCategories() {
        setGetContent([]);
        setCountItems(0);
        setShowListCategories(true);
        setShowListWords(false);
        setShowSearchWord(false);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}`}`);
        response = await response.json();
        setGetContent(response);
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
            range: 5,
            setCountItems: setCountItems
        }
        getCountPages(data);
    }
    async function currentCategory() {
        setCurrentNameCategory(props.searchWord.categoryName);
        setShowListCategories(false);
        setShowSearchWord(false);
        setShowListWords(true);
        setGetContent([]);
        setCountItems(0);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${0}&categoryName=${props.searchWord.categoryName}&userName=${sessionStorage.userName}`}`);
        response = await response.json();
        setGetContent(response);
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${props.searchWord.categoryName}&userName=${sessionStorage.userName}`}`,
            range: 24,
            setCountItems: setCountItems
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
                    props.showSearchWord === true &&
                    <Link
                        style={{
                            cursor: 'pointer'
                        }}
                        color="inherit"
                        onClick={currentCategory}
                    >
                        {props.searchWord.categoryName}
                    </Link>
                }
                <Typography
                    color="textPrimary"
                >
                    {
                        props.showListWords === true &&
                        props.currentNameCategory
                    }
                    {
                        props.showSearchWord === true &&
                        props.valueSearchWord
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
export default MenuNavigation;