import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ApplictationContext } from '../Application';

const CategoryForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const [valueNameCategory, setValueNameCategory] = React.useState('');
    const nameChange = (event) => {
        setValueNameCategory(event.target.value);
    };
    async function addCategory() {
        setValues({
            ...values,
            countCategories: 0
        });
        const checkDate = () => {
            if (new Date().getDate() < 10) {
                return `${'0'}${new Date().getDate()}`;
            } else {
                return new Date().getDate();
            }
        }
        const checkMonth = () => {
            if (new Date().getMonth() + 1 < 10) {
                return `${'0'}${new Date().getMonth() + 1}`;
            } else {
                return new Date().getMonth() + 1;
            }
        }
        let category = {
            name: valueNameCategory,
            userName: sessionStorage.userName,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`,
            words: []
        }
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/add/category?userName=${sessionStorage.userName}`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        response = await response.json();
        if (response.name !== null) {
            setValueNameCategory('');
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            user.categories.push(category);
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
            values.showListCategories === true &&
                setValues({
                    ...values,
                    loadCategories: response.name
                });
        } else {
            setValueNameCategory('');
            setValues({
                ...values,
                typeMistake: 'This category already has in the dictionary-',
                alertMistakes: true
            });
        }
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addCategory();
        }
    }
    const closeFormCategory = () => {
        setValues({
            ...values,
            showMainMenu: true,
            showFormCategory: false
        });
    }
    return (
        <div
            className='category_form'
        >
            <button
                className='close_category_form'
                onClick={closeFormCategory}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                >
                    <path d="M6 4.36L10.02.34a1.16 1.16 0 0 1 1.64 1.64L7.64 6l4.02 4.02a1.16 1.16 0 0 1-1.64 1.64L6 7.64l-4.02 4.02a1.16 1.16 0 0 1-1.64-1.64L4.36 6 .34 1.98A1.16 1.16 0 1 1 1.98.34L6 4.36z" fill="black"></path>
                </svg>
            </button>
            <TextField
                id="outlined-search"
                label="Category name"
                type="search"
                variant="outlined"
                value={valueNameCategory}
                onChange={nameChange}
                onKeyPress={onKeyPress}
                style={{
                    width: '330px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!valueNameCategory}
                onClick={addCategory}
                style={{
                    width: '330px',
                    height: '50px',
                    marginBottom: '50px'
                }}
            >
                Add category
            </Button>
        </div>
    )
}
export default CategoryForm;