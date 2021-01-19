import React from 'react';
import MainMenu from './MainMenu';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';
import { getCountPages } from './Functions';

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
    const [countItems, setCountItems] = React.useState(0);
    if (sessionStorage.userName === '' || sessionStorage.getItem('login') === 'logout' || sessionStorage.userName === 'admin') {
        return null;
    } else {
        if (showListCategories === true && alertMistakes === false) {
            startListCategories === true &&
                (async () => {
                    let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}`}`);
                    response = await response.json();
                    setGetContent(response);
                    setStartListCategories(false);
                    let data = {
                        url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
                        range: 5,
                        setCountItems: setCountItems
                    }
                    getCountPages(data);
                })();
        }
        return (
            <div
                className='user_page'
            >
                <MainMenu
                    login={sessionStorage.userName}
                    setShowListCategories={setShowListCategories}
                    setShowListWords={setShowListWords}
                    setShowSearchWord={setShowSearchWord}
                    setValueSearchWord={setValueSearchWord}
                    valueSearchWord={valueSearchWord}
                    setGetContent={setGetContent}
                    numberPageCategory={numberPageCategory}
                    numberPageWord={numberPageWord}
                    setAlertMistakes={setAlertMistakes}
                    setTypeMistake={setTypeMistake}
                    setCountItems={setCountItems}
                />
                <MenuNavigation
                    setShowListCategories={setShowListCategories}
                    setShowListWords={setShowListWords}
                    showListWords={showListWords}
                    setCurrentNameCategory={setCurrentNameCategory}
                    currentNameCategory={currentNameCategory}
                    setShowSearchWord={setShowSearchWord}
                    showSearchWord={showSearchWord}
                    setValueSearchWord={setValueSearchWord}
                    valueSearchWord={valueSearchWord}
                    setGetContent={setGetContent}
                    searchWord={getContent}
                    setCountItems={setCountItems}
                />
                <Content
                    showListCategories={showListCategories}
                    setShowListCategories={setShowListCategories}
                    showListWords={showListWords}
                    setShowListWords={setShowListWords}
                    setCurrentNameCategory={setCurrentNameCategory}
                    currentNameCategory={currentNameCategory}
                    setShowSearchWord={setShowSearchWord}
                    showSearchWord={showSearchWord}
                    setValueSearchWord={setValueSearchWord}
                    valueSearchWord={valueSearchWord}
                    setNumberPageCategory={setNumberPageCategory}
                    numberPageCategory={numberPageCategory}
                    setNumberPageWord={setNumberPageWord}
                    numberPageWord={numberPageWord}
                    setGetContent={setGetContent}
                    getContent={getContent}
                    setCountItems={setCountItems}
                    countItems={countItems}
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