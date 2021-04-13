import React from 'react';
import MainMenu from './MainMenu';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';

const User = (props) => {
    const { values, setValues } = props;
    React.useEffect(() => {
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${values.numberPageCategory - 1}`}`);
            response = await response.json();
            setValues({
                ...values,
                getContent: response,
                changeCountPages: {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
                    range: 5
                }
            });
        })();
    }, [values.loadCategories]);
    const getWords = async () => {
        if (values.currentNameCategory) {
            setValues({
                ...values,
                countWords: 0,
                getContent: []
            });
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${values.numberPageWord - 1}&categoryName=${values.currentNameCategory}&userName=${sessionStorage.userName}`}`);
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
    const getCountPages = async (props) => {
        const { url, range } = props;
        let response = await fetch(url);
        response = await response.json();
        let countPages = response % range > 0 ? Math.round(response / range) + 1 : Math.round(response / range);
        if (range == 5) {
            setValues({
                ...values,
                countCategories: countPages
            });
        } else if (range == 24) {
            setValues({
                ...values,
                countWords: countPages
            });
        }
    }
    React.useEffect(() => {
        getCountPages(values.changeCountPages);
    }, [values.changeCountPages]);
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
                    values={values}
                    setValues={setValues}
                />
                <MenuNavigation
                    values={values}
                    setValues={setValues}
                />
                <Content
                    values={values}
                    setValues={setValues}
                />
                {values.alertMistakes === true &&
                    (() => {
                        setValues({
                            ...values,
                            number: 4
                        });
                        return (
                            <Alerts
                                values={values}
                                setValues={setValues}
                            />
                        )
                    })()
                }
            </div>
        )
    }
}
export default User;