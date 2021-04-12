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

const Content = (props) => {
    const [valuesDeleteCategories, setValuesDeleteCategories] = React.useState({
        showDeleteButtonCategory: false,
        listIdCategories: []
    });
    const { values, setValues } = props;
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
            body: JSON.stringify(valuesDeleteCategories.listIdCategories)
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
            loadCategories: valuesDeleteCategories.listIdCategories
        });
        setValuesDeleteCategories({
            ...valuesDeleteCategories,
            listIdCategories: [],
            showDeleteButtonCategory: false
        });
    }
    const getIdCategory = (event) => {
        let listId = valuesDeleteCategories.listIdCategories;
        if (event.target.checked === true) {
            listId.push(parseInt(event.target.value));
            setValuesDeleteCategories({
                ...valuesDeleteCategories,
                listIdCategories: listId,
                showDeleteButtonCategory: true
            });
        } else {
            setValuesDeleteCategories({
                ...valuesDeleteCategories,
                listIdCategories: valuesDeleteCategories.listIdCategories.filter(item => item != parseInt(event.target.value)),
                showDeleteButtonCategory: valuesDeleteCategories.listIdCategories.length - 1 == 0 && false
            });
        }
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
                    valuesDeleteCategories.showDeleteButtonCategory === true &&
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
                    <ListCategories
                        getIdCategory={getIdCategory}
                        values={values}
                        setValues={setValues}
                    />
                }
                {/* {
                    showListWords === true &&
                    <TableWords
                        currentNameCategory={currentNameCategory}
                        numberPageWord={numberPageWord}
                        setGetContent={setGetContent}
                        words={getContent}
                        setCountWords={setCountWords}
                        setLoadWords={setLoadWords}
                    />
                } */}
                {/* {
                    showSearchWord === true &&
                    <SearchWord
                        searchWord={getContent}
                    />
                } */}
            </div>
            {
                values.showListCategories === true &&
                <PaginationButtonsCategories
                    values={values}
                    setValues={setValues}
                />
            }
            {/* {
                showListWords === true &&
                <PaginationButtonsWords
                    currentNameCategory={currentNameCategory}
                    countWords={countWords}
                    setNumberPageWord={setNumberPageWord}
                    setGetContent={setGetContent}
                    setLoadWords={setLoadWords}
                />
            } */}
        </div >
    )
}
export default Content;