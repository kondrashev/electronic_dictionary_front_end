import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import transformLetters from './TransformLetters';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';
import { addWordFetchData } from '../../store/update_words/action_add';
import { getAllCategoriesFetchData } from '../../store/get_all_categories/action';

const WordForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { wordAdd, getAllCategories, allCategories } = props;
    const [valuesWordForm, setValuesWordForm] = React.useState({
        valueName: '',
        valueMeaning: '',
        valueSelect: ''
    });
    React.useEffect(() => {
        getAllCategories(`${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefoxURL}.herokuapp.com/get/all/categories?userName=${sessionStorage.userName}`}`);
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
    const addWord = () => {
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
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefoxURL}.herokuapp.com/add/word?userName=${sessionStorage.userName}&categoryName=${valuesWordForm.valueSelect}`}`,
            word: word,
            values,
            setValues,
            valuesWordForm,
            setValuesWordForm
        }
        wordAdd(data);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addWord();
        }
    };
    const categories = allCategories.map(category =>
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
const mapStateToProps = state => {
    return {
        allCategories: state.getAllCategoriesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        wordAdd: (data) => dispatch(addWordFetchData(data)),
        getAllCategories: (url) => dispatch(getAllCategoriesFetchData(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WordForm);