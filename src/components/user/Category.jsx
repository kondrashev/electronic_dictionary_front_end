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
import { getNewContent, getCountPages } from './Functions';

function Category(props) {
    const [show, setShow] = useState(true);
    const [border, setBorder] = useState(0);
    const [oldNameCategory, setOldNameCategory] = useState('');
    const [newNameCategory, setNewNameCategory] = useState('');
    const { setGetContent, numberPageCategory,
        setCurrentNameCategory, setCountWords,
        setShowListCategories, setShowListWords } = props;
    async function getNameCategory(name) {
        setGetContent([]);
        setCurrentNameCategory(name);
        setShowListCategories(false);
        setShowListWords(true);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/words?page=${0}&categoryName=${name}&userName=${sessionStorage.userName}`}`);
        response = await response.json();
        props.setGetContent(response);
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/words?categoryName=${name}&userName=${sessionStorage.userName}`}`,
            range: 24,
            setCountWords: setCountWords
        }
        getCountPages(data);
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
                    let data = {
                        url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${numberPageCategory - 1}`}`,
                        setGetContent: setGetContent
                    }
                    getNewContent(data);
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
                        value={props.item.id}
                        onChange={props.getIdCategory}
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
                    primary={props.item.name}
                    onClick={() => getNameCategory(props.item.name)}
                />
                <input
                    disabled={show}
                    name={props.index}
                    value={newNameCategory}
                    onChange={(event) => editNameCategory(event, props.item.name)}
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
                    {props.item.date}
                </ListItem>
                <Tooltip
                    title='Edit'
                >
                    <IconButton
                        aria-label='Edit'
                        value={props.index}
                        name={props.item.name}
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