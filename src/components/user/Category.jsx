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
    const inputEditNameCategory = React.useRef('');
    const nameOldCategory = React.useRef('');
    const [valuesCategory, setValuesCategory] = useState({
        showInputEditNameCategory: true,
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
            showInputEditNameCategory: !valuesCategory.showInputEditNameCategory
        });
    }
    React.useEffect(() => {
        inputEditNameCategory.current.focus();
    }, [valuesCategory.showInputEditNameCategory]);
    const editNameCategory = (event) => {
        setValuesCategory({
            ...valuesCategory,
            oldNameCategory: nameOldCategory.current.innerText,
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
                url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefixURL}.herokuapp.com/edit/category`}`,
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
                    ref={nameOldCategory}
                    primary={itemCategory.name}
                    onClick={() => getNameCategory(itemCategory.name)}
                />
                <input
                    ref={inputEditNameCategory}
                    name={indexCategory}
                    value={valuesCategory.newNameCategory}
                    onChange={(event) => editNameCategory(event)}
                    onKeyUp={nameEditCategory}
                    disabled={valuesCategory.showInputEditNameCategory}
                    style={{
                        width: '150px',
                        height: '20px',
                        border: 'none',
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