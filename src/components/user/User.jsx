import React from 'react';
import MainMenu from './MainMenu';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';
import { ApplictationContext } from '../Application';

const User = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const getWords = async () => {
        if (values.currentNameCategory) {
            setValues({
                ...values,
                getContent: []
            });
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${values.numberPage - 1}&categoryName=${values.currentNameCategory}&userName=${sessionStorage.userName}`}`);
            response = await response.json();
            setValues({
                ...values,
                getContent: response,
                changeCountPages: {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${values.currentNameCategory}&userName=${sessionStorage.userName}`}`,
                    range: 24
                }
            });
        }
    }
    React.useEffect(() => {
        getWords();
    }, [values.loadWords]);
    if (sessionStorage.userName === '' ||
        sessionStorage.getItem('login') === 'logout' ||
        sessionStorage.userName === 'admin') {
        return null;
    } else {
        return (
            <div
                className='user_page'
            >
                <MainMenu />
                <MenuNavigation />
                <Content />
                {values.alertMistakes === true && <Alerts />}
            </div>
        )
    }
}
export default User;