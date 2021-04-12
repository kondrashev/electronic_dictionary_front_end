import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import CategoryForm from './CategoryForm';
import WordForm from './WordForm';
import { Transition, animated } from 'react-spring/renderprops';

const OpenMenu = (props) => {
    const { values, setValues } = props;
    const formCategoryShow = () => {
        setValues({
            ...values,
            showMainMenu: false,
            showFormCategory: true
        });
    }
    const formWordShow = () => {
        setValues({
            ...values,
            showMainMenu: false,
            showFormWord: true
        });
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
                    <>
                        <Button
                            variant="contained"
                            color="primary" {...bindTrigger(popupState)}
                        >
                            Open Menu
                        </Button>
                        {values.showMainMenu &&
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
                    </>
                )}
            </PopupState >
            <Transition
                native
                items={values.showFormCategory}
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
                            values={values}
                            setValues={setValues}
                        />
                    </animated.div>
                ))}
            </Transition>
            <Transition
                native
                items={values.showFormWord}
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
                            values={values}
                            setValues={setValues}

                        />
                    </animated.div>
                ))}
            </Transition>
        </div >
    )
}
export default OpenMenu;