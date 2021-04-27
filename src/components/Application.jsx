import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/redusers';
import AuthorizationForm from './authorization/AuthorizationForm';
import User from './user/User';
import Admin from './admin/Admin';
import Alerts from './authorization/Alerts';
import RegistrationForm from './authorization/RegistrationForm';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
export const ApplictationContext = React.createContext();
const Applictation = () => {
    const [values, setValues] = React.useState({
        listUsers: [],
        userListId: [],
        searchUserMark: false,
        getSearchUser: [],
        alertMistakes: false,
        typeMistake: '',
        login: '',
        password: '',
        number: 0,
        showListCategories: true,
        showListWords: false,
        showSearchWord: false,
        valueSearchWord: '',
        currentNameCategory: '',
        numberPage: 1,
        alertMistakes: false,
        typeMistake: '',
        loadCategories: '',
        loadWords: '',
        changeCountPages: '',
        showMainMenu: true,
        showFormCategory: false,
        showFormWord: false,
        showDeleteButtonCategory: false,
        listIdCategories: [],
        categoryName: '',
        showButtonMoveWords: false,
        showButtonDeleteWords: true,
        listIdWords: [],
        prefixURL: 'specialdictionary', //'development_version'
        // prefixURL: 'storageinformation' //'prodaction_version'
    });
    return (
        <Provider store={store}>
            <ApplictationContext.Provider
                value={{
                    values: values,
                    setValues: setValues
                }}
            >
                <>
                    {(() => {
                        if (window.location.search.replace('?', '') === '' ||
                            window.location.search.replace('?', '') === 'logout') {
                            return (
                                <AuthorizationForm />
                            )
                        } else {
                            switch (window.location.search.replace('?', '')) {
                                case 'admin':
                                    return <Admin />
                                case 'user':
                                    return <User />
                                case 'registration':
                                    return <RegistrationForm />
                                default:
                                    return <Alerts />
                            }
                        }
                    })()}
                </>
            </ApplictationContext.Provider>
        </Provider>
    )
}
export default Applictation;