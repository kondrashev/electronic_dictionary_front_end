import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';

function Category(props) {
    const [valuesCategory, setValuesCategory] = useState({
        show: true,
        border: 0,
        oldNameCategory: '',
        newNameCategory: ''
    });
    const { values, setValues, getIdCategory, itemCategory, indexCategory } = props;
    const getNameCategory = (name) => {
        setValues({
            ...values,
            countWords: 0,
            getContent: [],
            currentNameCategory: name,
            showListCategories: false,
            showListWords: true,
            getWords: name
        });
    }
    const showEdit = (event) => {
        setValuesCategory({
            ...valuesCategory,
            show: !valuesCategory.show,
            border: valuesCategory.show == true ? 1 : 0
        });
    }
    const editNameCategory = (event, name) => {
        setValuesCategory({
            ...valuesCategory,
            oldNameCategory: name,
            newNameCategory: event.target.value
        });
    }
    const nameEditCategory = (event) => {
        if (event.keyCode == 13) {
            (async function editCategory() {
                let editCategory = {
                    userName: sessionStorage.userName,
                    name: valuesCategory.oldNameCategory,
                    newName: valuesCategory.newNameCategory
                }
                let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/edit/category`}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editCategory)
                });
                response = await response.json();
                if (response.name !== null) {
                    setValuesCategory({
                        ...valuesCategory,
                        show: !valuesCategory.show,
                        border: valuesCategory.show == true ? 1 : 0,
                        newNameCategory: ''
                    });
                    let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                    Object.entries(user.categories).map(([, value]) => {
                        if (value.name === valuesCategory.oldNameCategory) {
                            value.name = valuesCategory.newNameCategory;
                        }
                    })
                    localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                    setValues({
                        ...values,
                        loadCategories: response.name
                    });
                }
            })();
        }
    }
    return (
        <List
            style={{
                marginTop: '20px'
            }}
        >
            <ListItem>
                <div
                    style={{
                        width: '60px'
                    }}
                >
                    <Checkbox
                        color="primary"
                        value={itemCategory.id}
                        onChange={getIdCategory}
                    />
                </div>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    style={{
                        cursor: 'pointer',
                        width: '300px'
                    }}
                    primary={itemCategory.name}
                    onClick={() => getNameCategory(itemCategory.name)}
                />
                <input
                    disabled={valuesCategory.show}
                    name={indexCategory}
                    value={valuesCategory.newNameCategory}
                    onChange={(event) => editNameCategory(event, itemCategory.name)}
                    onKeyUp={nameEditCategory}
                    style={{
                        width: '150px',
                        height: '20px',
                        border: `${valuesCategory.border}px solid black`,
                        background: 'none'
                    }}
                >
                </input>
                <ListItem>
                    {itemCategory.date}
                </ListItem>
                <Tooltip
                    title='Edit'
                >
                    <IconButton
                        aria-label='Edit'
                        value={indexCategory}
                        name={itemCategory.name}
                        onClick={showEdit}
                    >
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
            </ListItem >
        </List >
    )
}
export default Category;