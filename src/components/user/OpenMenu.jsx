import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import CategoryForm from './CategoryForm';
import WordForm from './WordForm';
import { Transition, animated } from 'react-spring/renderprops';

const OpenMenu = (props) => {
    const [showMainMenu, setShowMainMenu] = React.useState(true);
    const [showFormCategory, setShowFormCategory] = React.useState(false);
    const [showFormWord, setShowFormWord] = React.useState(false);
    const { numberPageCategory, numberPageWord, setAlertMistakes,
        setTypeMistake, setGetContent, setCountCategories,
        showListCategories, setCountWords, showListWords } = props;
    const formCategoryShow = () => {
        setShowMainMenu(false);
        setShowFormCategory(true);
    }
    const formWordShow = () => {
        setShowMainMenu(false);
        setShowFormWord(true);
    }
    return (
        <div
            style={{
                height: '35px'
            }}
        >
            <PopupState
                variant="popover"
                popupId="demo-popup-menu"
            >
                {(popupState) => (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            color="primary" {...bindTrigger(popupState)}
                        >
                            Open Menu
                        </Button>
                        {showMainMenu &&
                            <Menu
                                {...bindMenu(popupState)}
                                className='main_menu'
                            >
                                <MenuItem
                                    className='add_category'
                                    onClick={formCategoryShow}
                                >
                                    Add category
                            </MenuItem>
                                <MenuItem
                                    className='add_word'
                                    onClick={formWordShow}
                                >
                                    Add word
                            </MenuItem>
                            </Menu>}
                    </React.Fragment>
                )}
            </PopupState >
            <Transition
                native
                items={showFormCategory}
                from={{ marginLeft: -350 }}
                enter={{ marginLeft: -24 }}
                leave={{ marginLeft: -350 }}
                config={{ duration: 1000 }}
            >
                {show => show && (props => (
                    <animated.div
                        style={props}
                    >
                        <CategoryForm
                            setShowMainMenu={setShowMainMenu}
                            setShowFormCategory={setShowFormCategory}
                            numberPageCategory={numberPageCategory}
                            setAlertMistakes={setAlertMistakes}
                            setTypeMistake={setTypeMistake}
                            setGetContent={setGetContent}
                            setCountCategories={setCountCategories}
                            showListCategories={showListCategories}
                        />
                    </animated.div>
                ))}
            </Transition>
            <Transition
                native
                items={showFormWord}
                from={{ marginLeft: -350 }}
                enter={{ marginLeft: -24 }}
                leave={{ marginLeft: -350 }}
                config={{ duration: 1000 }}
            >
                {show => show && (props => (
                    <animated.div
                        style={props}
                    >
                        <WordForm
                            setShowMainMenu={setShowMainMenu}
                            setShowFormWord={setShowFormWord}
                            setAlertMistakes={setAlertMistakes}
                            setTypeMistake={setTypeMistake}
                            numberPageWord={numberPageWord}
                            setGetContent={setGetContent}
                            setCountWords={setCountWords}
                            showListWords={showListWords}
                        />
                    </animated.div>
                ))}
            </Transition>
        </div >
    )
}
export default OpenMenu;