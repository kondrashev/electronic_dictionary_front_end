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
    const [show, setShow] = useState(true);
    const [border, setBorder] = useState(0);
    const [oldNameCategory, setOldNameCategory] = useState('');
    const [newNameCategory, setNewNameCategory] = useState('');
    const { setGetContent, numberPageCategory,
        currentNameCategory, setCurrentNameCategory, setCountWords,
        setShowListCategories, setShowListWords,
        setLoadCategories, loadWords, setLoadWords,
        getWords, index, item, getIdCategory } = props;
    const getNameCategory = (name) => {
        setCountWords(0);
        setGetContent([]);
        setCurrentNameCategory(name);
        setShowListCategories(false);
        setShowListWords(true);
        getWords(name);
    }
    const showEdit = (event) => {
        setShow(!show);
        setBorder(show == true ? 1 : 0);
    }
    const editNameCategory = (event, name) => {
        setOldNameCategory(name);
        setNewNameCategory(event.target.value);
    }
    const nameEditCategory = (event) => {
        if (event.keyCode == 13) {
            (async function editCategory() {
                let editCategory = {
                    userName: sessionStorage.userName,
                    name: oldNameCategory,
                    newName: newNameCategory
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
                    setShow(!show);
                    setBorder(show == true ? 1 : 0);
                    setNewNameCategory('');
                    let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
                    Object.entries(user.categories).map(([, value]) => {
                        if (value.name === oldNameCategory) {
                            value.name = newNameCategory;
                        }
                    })
                    localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
                    setLoadCategories(response.name);
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
                        value={item.id}
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
                    primary={item.name}
                    onClick={() => getNameCategory(item.name)}
                />
                <input
                    disabled={show}
                    name={index}
                    value={newNameCategory}
                    onChange={(event) => editNameCategory(event, item.name)}
                    onKeyUp={nameEditCategory}
                    style={{
                        width: '150px',
                        height: '20px',
                        border: `${border}px solid black`,
                        background: 'none'
                    }}
                >
                </input>
                <ListItem>
                    {item.date}
                </ListItem>
                <Tooltip
                    title='Edit'
                >
                    <IconButton
                        aria-label='Edit'
                        value={index}
                        name={item.name}
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