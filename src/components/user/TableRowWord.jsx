import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { getNewContent } from './Functions';

const TableRowWord = (props) => {
    const [showEditNameWord, setShowEditNameWord] = React.useState(false);
    const [showEditMeaningWord, setShowEditMeaningWord] = React.useState(false);
    const [oldNameWord, setOldNameWord] = React.useState('');
    const [newNameWord, setNewNameWord] = React.useState('');
    const [oldMeaningWord, setOldMeaningWord] = React.useState('');
    const [newMeaningWord, setNewMeaningWord] = React.useState('');
    const { setGetContent, numberPageWord, currentNameCategory } = props;
    const pronunciation = (name) => {
        return `${'https://translate.google.com/#view=home&op=translate&sl=en&tl=uk&text='}${name}`;
    }
    const editNameWord = (event) => {
        setNewNameWord(event.target.value);
    }
    const editMeaningWord = (event) => {
        setNewMeaningWord(event.target.value);
    }
    const editNameWordShow = (oldName) => {
        setOldNameWord(oldName);
        setShowEditNameWord(!showEditNameWord);
    }
    const editMeaningWordShow = (oldName, oldMeaning) => {
        setOldNameWord(oldName);
        setOldMeaningWord(oldMeaning);
        setShowEditMeaningWord(!showEditMeaningWord);
    }
    async function changeNameWord(event) {
        if (event.keyCode == 13) {
            let editNameWord = {
                userName: sessionStorage.userName,
                name: oldNameWord,
                newName: newNameWord,
                mark: 'name'
            }
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/edit/word`}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editNameWord)
            })
            response = await response.json();
            if (response.name !== null) {
                setNewNameWord('');
                setShowEditNameWord(false);
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === props.currentNameCategory) {
                        value.words.map((word) => {
                            if (word.name === oldNameWord) {
                                word.name = newNameWord
                            }
                        })
                    }
                })
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                let data = {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${numberPageWord - 1}&categoryName=${currentNameCategory}&userName=${sessionStorage.userName}`}`,
                    setGetContent: setGetContent
                }
                getNewContent(data);
            }
        }
    }
    async function changeMeaningWord(event) {
        if (event.keyCode == 13) {
            let editMeaningWord = {
                userName: sessionStorage.userName,
                name: oldNameWord,
                meaning: oldMeaningWord,
                newMeaning: newMeaningWord,
                mark: 'meaning'
            }
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/edit/word`}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editMeaningWord)
            })
            response = await response.json();
            if (response.name !== null) {
                setNewMeaningWord('');
                setShowEditMeaningWord(false);
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === props.currentNameCategory) {
                        value.words.map((word) => {
                            if (word.meaning === oldMeaningWord) {
                                word.meaning = newMeaningWord
                            }
                        })
                    }
                })
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                let data = {
                    url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${numberPageWord - 1}&categoryName=${currentNameCategory}&userName=${sessionStorage.userName}`}`,
                    setGetContent
                }
                getNewContent(data);
            }
        }
    }
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={props.isItemSelected}
            tabIndex={-1}
            key={props.row.name}
            selected={props.isItemSelected}
            className='row_edit_word'
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={props.isItemSelected}
                    inputProps={{ 'aria-labelledby': props.labelId }}
                    value={props.row.id}
                    onChange={props.getIdWord}
                    onClick={(event) => props.handleClick(event, props.row.name)}
                />
            </TableCell>
            <Tooltip
                title='Edit name'
            >
                <TableCell
                    component="th"
                    id={props.labelId}
                    scope="row"
                    padding="none"
                    className='name_word'
                    onClick={() => editNameWordShow(props.row.name)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {props.row.name}
                </TableCell>
            </Tooltip>
            {showEditNameWord === true &&
                <TableCell
                    className='edit_name_word'
                    style={{
                        position: 'relative'
                    }}
                >
                    <input
                        className='edit_word_name'
                        onChange={editNameWord}
                        onKeyUp={changeNameWord}
                        placeholder='Edit name'
                        style={{
                            marginTop: '12px'
                        }}
                    >
                    </input>
                </TableCell>
            }
            <Tooltip
                title='Edit meaning'
            >
                <TableCell
                    align="right"
                    className='meaning_word'
                    onClick={() => editMeaningWordShow(props.row.name, props.row.meaning)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {props.row.meaning}
                </TableCell>
            </Tooltip>
            {showEditMeaningWord === true &&
                <TableCell
                    className='edit_meaning_word'
                    style={{
                        position: 'relative'
                    }}
                >
                    <input
                        className='edit_word_meaning'
                        onChange={editMeaningWord}
                        onKeyUp={changeMeaningWord}
                        placeholder='Edit meaning'
                        style={{
                            marginTop: '12px'
                        }}
                    >
                    </input>
                </TableCell>
            }
            <TableCell align="right">
                {props.row.date}
            </TableCell>
            <TableCell align="right">
                <a
                    href={pronunciation(props.row.name)}
                    target='_blank'
                >
                    {props.row.name}
                </a>
            </TableCell>
        </TableRow>
    )
}
export default TableRowWord;