import React from 'react';
import MainMenu from './MainMenu';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';

const User = (props) => {
    const [showListCategories, setShowListCategories] = React.useState(true);
    const [showListWords, setShowListWords] = React.useState(false);
    const [showSearchWord, setShowSearchWord] = React.useState(false);
    const [valueSearchWord, setValueSearchWord] = React.useState('');
    const [currentNameCategory, setCurrentNameCategory] = React.useState('');
    const [getContent, setGetContent] = React.useState([]);
    const [numberPageCategory, setNumberPageCategory] = React.useState(1);
    const [numberPageWord, setNumberPageWord] = React.useState(1);
    const [alertMistakes, setAlertMistakes] = React.useState(false);
    const [typeMistake, setTypeMistake] = React.useState('');
    const [startListCategories, setStartListCategories] = React.useState(true);
    const [countCategories, setCountCategories] = React.useState(0);
    const [countWords, setCountWords] = React.useState(0);
    const [loadCategories, setLoadCategories] = React.useState('');
    const [loadWords, setLoadWords] = React.useState('');
    const [changeCountPages, setChangeCountPages] = React.useState('');
    React.useEffect(() => {
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${numberPageCategory - 1}`}`);
            response = await response.json();
            setGetContent(response);
            let data = {
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
                range: 5,
                setCountPages: setCountCategories
            }
            setChangeCountPages(data);
        })();
    }, [loadCategories]);
    const getWords = async (name) => {
        if (name || currentNameCategory) {
            setCountWords(0);
            setGetContent([]);
            setShowListCategories(false);
            setShowListWords(true);
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${numberPageWord - 1}&categoryName=${name || currentNameCategory}&userName=${sessionStorage.userName}`}`);
            response = await response.json();
            setGetContent(response);
            let data = {
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${name || currentNameCategory}&userName=${sessionStorage.userName}`}`,
                range: 24,
                setCountPages: setCountWords
            }
            setChangeCountPages(data);
        }
    }
    React.useEffect(() => {
        getWords();
    }, [loadWords]);
    const getCountPages = async (props) => {
        const { url, range, setCountPages } = props;
        let response = await fetch(url);
        response = await response.json();
        setCountPages(response % range > 0 ? Math.round(response / range) + 1 : Math.round(response / range));
    }
    React.useEffect(() => {
        getCountPages(changeCountPages);
    }, [changeCountPages]);
    if (sessionStorage.userName === '' ||
        sessionStorage.getItem('login') === 'logout' ||
        sessionStorage.userName === 'admin') {
        return null;
    } else {
        return (
            <div
                className='user_page'
            >
                <MainMenu
                    setShowListCategories={setShowListCategories}
                    showListCategories={showListCategories}
                    setShowListWords={setShowListWords}
                    showListWords={showListWords}
                    setShowSearchWord={setShowSearchWord}
                    setValueSearchWord={setValueSearchWord}
                    setGetContent={setGetContent}
                    numberPageCategory={numberPageCategory}
                    numberPageWord={numberPageWord}
                    setAlertMistakes={setAlertMistakes}
                    setTypeMistake={setTypeMistake}
                    setCountCategories={setCountCategories}
                    setCountWords={setCountWords}
                    setLoadCategories={setLoadCategories}
                    setLoadWords={setLoadWords}
                    currentNameCategory={currentNameCategory}
                    setCurrentNameCategory={setCurrentNameCategory}
                />
                <MenuNavigation
                    showListCategories={showListCategories}
                    setShowListCategories={setShowListCategories}
                    setShowListWords={setShowListWords}
                    showListWords={showListWords}
                    setCurrentNameCategory={setCurrentNameCategory}
                    currentNameCategory={currentNameCategory}
                    setShowSearchWord={setShowSearchWord}
                    showSearchWord={showSearchWord}
                    valueSearchWord={valueSearchWord}
                    setGetContent={setGetContent}
                    searchWord={getContent}
                    setCountWords={setCountWords}
                    numberPageCategory={numberPageCategory}
                    setLoadCategories={setLoadCategories}
                    setLoadWords={setLoadWords}
                />
                <Content
                    showListCategories={showListCategories}
                    setShowListCategories={setShowListCategories}
                    showListWords={showListWords}
                    setShowListWords={setShowListWords}
                    showSearchWord={showSearchWord}
                    setCurrentNameCategory={setCurrentNameCategory}
                    currentNameCategory={currentNameCategory}
                    setShowSearchWord={setShowSearchWord}
                    valueSearchWord={valueSearchWord}
                    setNumberPageCategory={setNumberPageCategory}
                    numberPageCategory={numberPageCategory}
                    setNumberPageWord={setNumberPageWord}
                    numberPageWord={numberPageWord}
                    setGetContent={setGetContent}
                    getContent={getContent}
                    setCountCategories={setCountCategories}
                    countCategories={countCategories}
                    setCountWords={setCountWords}
                    countWords={countWords}
                    setLoadCategories={setLoadCategories}
                    loadWords={loadWords}
                    setLoadWords={setLoadWords}
                    getWords={getWords}
                />
                {alertMistakes === true &&
                    <Alerts
                        number={4}
                        setAlertMistakes={setAlertMistakes}
                        typeMistake={typeMistake}
                    />
                }
            </div>
        )
    }
}
export default User;