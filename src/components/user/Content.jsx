import React from 'react';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableWords from './TableWords';
import SearchWord from './SearchWord';
import PaginationButtonsCategories from './PaginationButtonsCategories';
import PaginationButtonsWords from './PaginationButtonsWords';
import ListCategories from './ListCategories';
import { ApplictationContext } from '../Application';

const Content = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    async function deleteCategories() {
        setValues({
            ...values,
            countCategories: 0
        });
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${'https://specialdictionary.herokuapp.com/delete/categories'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values.listIdCategories)
        })
        response = await response.json();
        let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
        response.map(categoryName => {
            user.categories.map((category, index) => {
                if (categoryName === category.name) {
                    user.categories.splice(index, 1);
                }
            })
        })
        localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        setValues({
            ...values,
            loadCategories: values.listIdCategories,
            listIdCategories: [],
            showDeleteButtonCategory: false
        });
    }
    return (
        < div >
            <div
                className='list_categories'
                style={{
                    width: 'auto',
                    position: 'absolute',
                    top: '110px',
                    left: '53.5%',
                    transform: 'translate(-50%,0)'
                }}
            >
                {
                    values.showDeleteButtonCategory === true &&
                    <List
                        style={{
                            float: 'right'
                        }}
                    >
                        <ListItemSecondaryAction >
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                className='category_delete'
                                onClick={deleteCategories}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </List>
                }
                {
                    values.showListCategories === true &&
                    <ListCategories />
                }
                {
                    values.showListWords === true &&
                    <TableWords />
                }
                {
                    values.showSearchWord === true &&
                    <SearchWord />
                }
            </div>
            {
                values.showListCategories === true &&
                <PaginationButtonsCategories />
            }
            {
                values.showListWords === true &&
                <PaginationButtonsWords />
            }
        </div >
    )
}
export default Content;