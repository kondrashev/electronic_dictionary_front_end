import React from 'react';
import MainMenu from './MainMenu';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';
import { ApplictationContext } from '../Application';

const User = (props) => {
    const { values } = React.useContext(ApplictationContext);
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
                {values.alertMistakes && <Alerts />}
            </div>
        )
    }
}
export default User;