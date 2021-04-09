import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
    const { getIdCategory, setShowListCategories, setShowListWords, setCurrentNameCategory,
        currentNameCategory, numberPageCategory, setGetContent, categories, setCountWords,
        setLoadCategories, loadWords, setLoadWords, getWords } = props;
    return (
        categories.map((category, index) => {
            return (
                <Category
                    key={category.name}
                    item={category}
                    index={index}
                    getIdCategory={getIdCategory}
                    setShowListCategories={setShowListCategories}
                    setShowListWords={setShowListWords}
                    currentNameCategory={currentNameCategory}
                    setCurrentNameCategory={setCurrentNameCategory}
                    numberPageCategory={numberPageCategory}
                    setCountWords={setCountWords}
                    setGetContent={setGetContent}
                    setLoadCategories={setLoadCategories}
                    loadWords={loadWords}
                    setLoadWords={setLoadWords}
                    getWords={getWords}
                />
            )
        })
    )
}
export default ListCategories;