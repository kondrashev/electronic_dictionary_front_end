import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import transformLetters from './TransformLetters';
import { getNewContent, getCountPages } from './Functions';

const WordForm = (props) => {
    const [valueName, setValueName] = React.useState('');
    const [valueMeaning, setValueMeaning] = React.useState('');
    const [valueSelect, setValueSelect] = React.useState('');
    const [allCategories, setAllCategories] = React.useState([]);
    const [getListAllCategories, setGetListAllCategories] = React.useState(true);
    const { setGetContent, numberPageWord, setCountWords, showListWords } = props;
    getListAllCategories === true &&
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/all/categories?userName=${sessionStorage.userName}`}`);
            response = await response.json();
            setAllCategories(response);
            setGetListAllCategories(false);
        })();
    const nameChange = (event) => {
        if (event.target.value === '') {
            setValueMeaning('');
        }
        setValueName(event.target.value);
    }
    const meaningChange = (event) => {
        setValueMeaning(event.target.value);
    }
    const selectChange = (event) => {
        if (event.target.value === '') {
            setValueName('');
            setValueMeaning('');
        }
        setValueSelect(event.target.value);
    }
    const keyLetter = (event) => {
        setValueMeaning(transformLetters(event));
    }
    const closeFormWord = () => {
        props.setShowMainMenu(true);
        props.setShowFormWord(false);
    }
    async function addWord() {
        setCountWords(0);
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
            name: valueName,
            meaning: valueMeaning,
            userName: sessionStorage.userName,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`,
            categoryName: valueSelect
        }
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/add/word?userName=${sessionStorage.userName}&categoryName=${valueSelect}`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        })
        response = await response.json();
        if (response.name !== null) {
            setValueSelect('');
            setValueName('');
            setValueMeaning('');
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            Object.entries(user.categories).map(([, value]) => {
                if (value.name === valueSelect) {
                    value.words.push(word);
                }
            })
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
            if (showListWords === true) {
                let data = {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${numberPageWord - 1}&categoryName=${valueSelect}&userName=${sessionStorage.userName}`}`,
                    setGetContent: setGetContent
                }
                getNewContent(data);
            }
            let anotherData = {
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${valueSelect}&userName=${sessionStorage.userName}`}`,
                range: 24,
                setCountWords: setCountWords
            }
            getCountPages(anotherData);
        } else {
            setValueSelect('');
            setValueName('');
            setValueMeaning('');
            props.setTypeMistake('This word already has in the dictionary-');
            props.setAlertMistakes(true);
        }
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addWord();
        }
    };
    const categories = allCategories.map(category =>
        <option
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
                    value={valueSelect}
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
                disabled={!valueSelect}
                value={valueName}
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
                disabled={!valueName}
                value={valueMeaning}
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
                disabled={!valueMeaning}
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