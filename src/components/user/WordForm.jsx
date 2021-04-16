import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import transformLetters from './TransformLetters';
import { getAllCategories } from './GetAllCategories';
import { ApplictationContext } from '../Application';

const WordForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const [valuesWordForm, setValuesWordForm] = React.useState({
        valueName: '',
        valueMeaning: '',
        valueSelect: ''
    });
    React.useEffect(() => {
        getAllCategories(values, setValues);
    }, []);
    const nameChange = (event) => {
        if (event.target.value === '') {
            setValuesWordForm({
                ...valuesWordForm,
                valueMeaning: ''
            });
        }
        setValuesWordForm({
            ...valuesWordForm,
            valueName: event.target.value
        });
    }
    const meaningChange = (event) => {
        setValuesWordForm({
            ...valuesWordForm,
            valueMeaning: event.target.value
        });
    }
    const selectChange = (event) => {
        if (event.target.value === '') {
            setValuesWordForm({
                ...valuesWordForm,
                valueName: '',
                valueMeaning: ''
            });
        }
        setValuesWordForm({
            ...valuesWordForm,
            valueSelect: event.target.value
        });
    }
    const keyLetter = (event) => {
        setValuesWordForm({
            ...valuesWordForm,
            valueMeaning: transformLetters(event)
        });
    }
    const closeFormWord = () => {
        setValues({
            ...values,
            showMainMenu: true,
            showFormWord: false
        });
    }
    async function addWord() {
        setValues({
            ...values,
            countWords: 0
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
        let word = {
            name: valuesWordForm.valueName,
            meaning: valuesWordForm.valueMeaning,
            userName: sessionStorage.userName,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`,
            categoryName: valuesWordForm.valueSelect
        }
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/add/word?userName=${sessionStorage.userName}&categoryName=${valuesWordForm.valueSelect}`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        })
        response = await response.json();
        if (response.name !== null) {
            setValuesWordForm({
                ...valuesWordForm,
                valueSelect: '',
                valueName: '',
                valueMeaning: ''
            });
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === valuesWordForm.valueSelect) {
                    value.words.push(word);
                }
            })
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
            setValues({
                ...values,
                showListCategories: false,
                showListWords: true,
                currentNameCategory: valuesWordForm.valueSelect,
                loadWords: response.name
            });
        } else {
            setValuesWordForm({
                ...valuesWordForm,
                valueSelect: '',
                valueName: '',
                valueMeaning: ''
            });
            setValues({
                ...values,
                number: 4,
                typeMistake: 'This word already has in the dictionary-',
                alertMistakes: true
            });
        }
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addWord();
        }
    };
    const categories = values.allCategories.map(category =>
        <option
            key={category.name}
            value={category.name}
        >
            {category.name}
        </option>
    )
    return (
        <div
            className='word_form'
        >
            <button
                className='close_word_form'
                onClick={closeFormWord}
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
            <FormControl
                variant="outlined"
                style={{
                    width: '330px'
                }}
            >
                <InputLabel
                    htmlFor="outlined-age-native-simple"
                >
                    Name
                </InputLabel>
                <Select
                    native
                    label='name'
                    value={valuesWordForm.valueSelect}
                    onChange={selectChange}
                    inputProps={{
                        name: 'name',
                        id: 'outlined-name-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {categories}
                </Select>
            </FormControl>
            <TextField
                id="word_name"
                label="Word name"
                type="search"
                variant="outlined"
                disabled={!valuesWordForm.valueSelect}
                value={valuesWordForm.valueName}
                onChange={nameChange}
                style={{
                    width: '330px'
                }}
            />
            <TextField
                id="word_meaning"
                label="Meaning of the word"
                type="search"
                variant="outlined"
                disabled={!valuesWordForm.valueName}
                value={valuesWordForm.valueMeaning}
                onChange={meaningChange}
                onKeyUp={keyLetter}
                onKeyPress={onKeyPress}
                style={{
                    width: '330px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!valuesWordForm.valueMeaning}
                onClick={addWord}
                style={{
                    width: '330px',
                    height: '50px',
                    marginBottom: '50px'
                }}
            >
                Add word
            </Button>
        </div>
    )
}
export default WordForm;