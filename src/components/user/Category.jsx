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
import { ApplictationContext } from '../Application';
import { CategoriesContext } from './ListCategories';
import { connect } from 'react-redux';
import { editCategoryFetchData } from '../../store/update_categories/action_edit';

function Category(props) {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getIdCategory, itemCategory, indexCategory } = React.useContext(CategoriesContext);
    const { categoryEditName } = props;
    const [valuesCategory, setValuesCategory] = useState({
        show: true,
        border: 0,
        oldNameCategory: '',
        newNameCategory: ''
    });
    const getNameCategory = (name) => {
        setValues({
            ...values,
            numberPage: 1,
            currentNameCategory: name,
            showListCategories: false,
            showListWords: true,
            loadWords: name
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
            let editCategory = {
                userName: sessionStorage.userName,
                name: valuesCategory.oldNameCategory,
                newName: valuesCategory.newNameCategory
            }
            let data = {
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/edit/category`}`,
                editCategory: editCategory,
                setValuesCategory: setValuesCategory,
                valuesCategory: valuesCategory
            }
            categoryEditName(data);
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
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        categoryEditName: (data) => dispatch(editCategoryFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);