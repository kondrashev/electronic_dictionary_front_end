import React from 'react';
import AuthorizationForm from './authorization/AuthorizationForm';
import User from './user/User';
import Admin from './admin/Admin';
import Alerts from './authorization/Alerts';
import RegistrationForm from './authorization/RegistrationForm';

export const ApplictationContext = React.createContext();
const Applictation = () => {
    const [values, setValues] = React.useState({
        listUsers: [],
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
        getContent: [],
        numberPageCategory: 1,
        numberPageWord: 1,
        alertMistakes: false,
        typeMistake: '',
        countCategories: 0,
        countWords: 0,
        loadCategories: '',
        loadWords: '',
        changeCountPages: '',
        showMainMenu: true,
        showFormCategory: false,
        showFormWord: false,
        allCategories: [],
        showDeleteButtonCategory: false,
        listIdCategories: [],
        categoryName: '',
        showButtonMoveWords: false,
        showButtonDeleteWords: true,
        listIdWords: [],
        showEditNameWord: false,
        showEditMeaningWord: false,
        oldNameWord: '',
        newNameWord: '',
        oldMeaningWord: '',
        newMeaningWord: ''
    });
    return (
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
                                return (
                                    <Admin />
                                )
                            case 'user':
                                return (
                                    <User />
                                )
                            case 'registration':
                                return (
                                    <RegistrationForm />
                                )
                            default:
                                return (
                                    <Alerts />
                                )
                        }
                    }
                })()}
            </>
        </ApplictationContext.Provider>
    )
}
export default Applictation;