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
    const [showDeleteButtonCategory, setShowDeleteButtonCategory] = React.useState(false);
    const [listIdCategories, setListIdCategories] = React.useState([]);
    const { showListCategories, setShowListCategories, showListWords, setShowListWords,
        setCurrentNameCategory, currentNameCategory, showSearchWord, valueSearchWord,
        setNumberPageCategory, numberPageCategory, setNumberPageWord, numberPageWord, setGetContent,
        getContent, setCountCategories, countCategories, setCountWords, countWords,
        setLoadCategories, loadWords, setLoadWords, getWords } = props;
    async function deleteCategories() {
        setCountCategories(0);
        let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${'https://specialdictionary.herokuapp.com/delete/categories'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listIdCategories)
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
        setLoadCategories(listIdCategories);
        setListIdCategories([]);
        setShowDeleteButtonCategory(false);
    }
    const getIdCategory = (event) => {
        let listId = listIdCategories;
        if (event.target.checked === true) {
            listId.push(parseInt(event.target.value));
            setListIdCategories(listId);
            setShowDeleteButtonCategory(true);
        } else {
            setListIdCategories(listIdCategories.filter(item => item != parseInt(event.target.value)));
            listIdCategories.length - 1 == 0 && setShowDeleteButtonCategory(false);
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
                    showDeleteButtonCategory === true &&
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
                    showListCategories === true &&
                    <ListCategories
                        getIdCategory={getIdCategory}
                        setShowListCategories={setShowListCategories}
                        setShowListWords={setShowListWords}
                        currentNameCategory={currentNameCategory}
                        setCurrentNameCategory={setCurrentNameCategory}
                        numberPageCategory={numberPageCategory}
                        setGetContent={setGetContent}
                        categories={getContent}
                        setCountWords={setCountWords}
                        setLoadCategories={setLoadCategories}
                        loadWords={loadWords}
                        setLoadWords={setLoadWords}
                        getWords={getWords}
                    />
                }
                {
                    showListWords === true &&
                    <TableWords
                        currentNameCategory={currentNameCategory}
                        numberPageWord={numberPageWord}
                        setGetContent={setGetContent}
                        words={getContent}
                        setCountWords={setCountWords}
                        setLoadWords={setLoadWords}
                    />
                }
                {
                    showSearchWord === true &&
                    <SearchWord
                        searchWord={getContent}
                    />
                }
            </div>
            {
                showListCategories === true &&
                <PaginationButtonsCategories
                    countCategories={countCategories}
                    setNumberPageCategory={setNumberPageCategory}
                    setGetContent={setGetContent}
                    setLoadCategories={setLoadCategories}
                />
            }
            {
                showListWords === true &&
                <PaginationButtonsWords
                    currentNameCategory={currentNameCategory}
                    countWords={countWords}
                    setNumberPageWord={setNumberPageWord}
                    setGetContent={setGetContent}
                    setLoadWords={setLoadWords}
                />
            }
        </div >
    )
}
export default Content;