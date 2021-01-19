import React from 'react';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableWords from './TableWords';
import SearchWord from './SearchWord';
import PaginationButtons from './PaginationButtons';
import ListCategories from './ListCategories';
import { getNewContent, getCountPages } from './Functions';

const Content = (props) => {
    const [showDeleteButtonCategory, setShowDeleteButtonCategory] = React.useState(false);
    const [listIdCategories, setListIdCategories] = React.useState([]);
    const { setGetContent, numberPageCategory, setCountCategories, countCategories,
        setCountWords, countWords, setShowListCategories,
        showListCategories, setShowListWords, showListWords } = props;
    async function deleteCategories() {
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
        setListIdCategories([]);
        setShowDeleteButtonCategory(false);
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${numberPageCategory - 1}`}`,
            setGetContent: setGetContent
        }
        getNewContent(data);
        let anotherData = {
            showListCategories: showListCategories,
            showListWords: showListWords,
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/count/categories?userName=${sessionStorage.userName}`}`,
            setCountCategories: setCountCategories,
            setCountWords: setCountWords
        }
        getCountPages(anotherData);
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
                    props.showListCategories === true &&
                    <ListCategories
                        getIdCategory={getIdCategory}
                        setShowListCategories={setShowListCategories}
                        showListCategories={showListCategories}
                        setShowListWords={setShowListWords}
                        showListWords={showListWords}
                        setCurrentNameCategory={props.setCurrentNameCategory}
                        numberPageCategory={props.numberPageCategory}
                        setGetContent={setGetContent}
                        categories={props.getContent}
                        setCountPages={props.setCountPages}
                        setCountWords={setCountWords}
                    />
                }
                {
                    props.showListWords === true &&
                    <TableWords
                        currentNameCategory={props.currentNameCategory}
                        numberPageWord={props.numberPageWord}
                        setGetContent={setGetContent}
                        setCountWords={setCountWords}
                        showListWords={showListWords}
                        words={props.getContent}
                    />
                }
                {
                    props.showSearchWord === true &&
                    <SearchWord
                        valueSearchWord={props.valueSearchWord}
                        searchWord={props.getContent}
                    />
                }
            </div>
            {
                props.showSearchWord === false &&
                <PaginationButtons
                    setShowListCategories={setShowListCategories}
                    showListCategories={showListCategories}
                    setShowListWords={setShowListWords}
                    showListWords={showListWords}
                    currentNameCategory={props.currentNameCategory}
                    setNumberPageCategory={props.setNumberPageCategory}
                    setNumberPageWord={props.setNumberPageWord}
                    setGetContent={setGetContent}
                    setCountCategories={setCountCategories}
                    countCategories={countCategories}
                    setCountWords={setCountWords}
                    countWords={countWords}
                />
            }
        </div >
    )
}
export default Content;