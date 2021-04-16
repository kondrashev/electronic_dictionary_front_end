import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { TableWordsContext } from './TableWords';
import { ApplictationContext } from '../Application';

const TableRowWord = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { row, isItemSelected, getIdWord, handleClick, labelId } = React.useContext(TableWordsContext);
    const pronunciation = (name) => {
        return `${'https://translate.google.com/#view=home&op=translate&sl=en&tl=uk&text='}${name}`;
    }
    const editNameWord = (event) => {
        setValues({
            ...values,
            newNameWord: event.target.value
        });
    }
    const editMeaningWord = (event) => {
        setValues({
            ...values,
            newMeaningWord: event.target.value
        });
    }
    const editNameWordShow = (oldName) => {
        setValues({
            ...values,
            oldNameWord: oldName,
            showEditNameWord: !values.showEditNameWord
        });
    }
    const editMeaningWordShow = (oldName, oldMeaning) => {
        setValues({
            ...values,
            oldNameWord: oldName,
            oldMeaningWord: oldMeaning,
            showEditMeaningWord: !values.showEditMeaningWord
        });
    }
    async function changeNameWord(event) {
        if (event.keyCode == 13) {
            let editNameWord = {
                userName: sessionStorage.userName,
                name: values.oldNameWord,
                newName: values.newNameWord,
                mark: 'name'
            }
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/edit/word`}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values.editNameWord)
            })
            response = await response.json();
            if (response.name !== null) {
                setValues({
                    ...values,
                    newNameWord: '',
                    showEditNameWord: false
                });
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === values.currentNameCategory) {
                        value.words.map((word) => {
                            if (word.name === values.oldNameWord) {
                                word.name = values.newNameWord
                            }
                        })
                    }
                })
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                setValues({
                    ...values,
                    loadWords: response.name
                });
            }
        }
    }
    async function changeMeaningWord(event) {
        if (event.keyCode == 13) {
            let editMeaningWord = {
                userName: sessionStorage.userName,
                name: values.oldNameWord,
                meaning: values.oldMeaningWord,
                newMeaning: values.newMeaningWord,
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
                setValues({
                    ...values,
                    newMeaningWord: '',
                    showEditMeaningWord: false
                });
                let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                Object.entries(user.categories).map(([, value]) => {
                    if (value.name === values.currentNameCategory) {
                        value.words.map((word) => {
                            if (word.meaning === values.oldMeaningWord) {
                                word.meaning = values.newMeaningWord
                            }
                        })
                    }
                })
                localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                setValues({
                    ...values,
                    loadWords: response.name
                });
            }
        }
    }
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
            className='row_edit_word'
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                    value={row.id}
                    onChange={getIdWord}
                    onClick={(event) => handleClick(event, row.name)}
                />
            </TableCell>
            <Tooltip
                title='Edit name'
            >
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    className='name_word'
                    onClick={() => editNameWordShow(row.name)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {row.name}
                </TableCell>
            </Tooltip>
            {values.showEditNameWord === true &&
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
                    onClick={() => editMeaningWordShow(row.name, row.meaning)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {row.meaning}
                </TableCell>
            </Tooltip>
            {values.showEditMeaningWord === true &&
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
                {row.date}
            </TableCell>
            <TableCell align="right">
                <a
                    href={pronunciation(row.name)}
                    target='_blank'
                >
                    {row.name}
                </a>
            </TableCell>
        </TableRow>
    )
}
export default TableRowWord;