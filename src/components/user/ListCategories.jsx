import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
    const { getIdCategory, setShowListCategories, setShowListWords, setCurrentNameCategory,
        numberPageCategory, setGetContent, categories, setCountWords } = props;
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
                    setCurrentNameCategory={setCurrentNameCategory}
                    numberPageCategory={numberPageCategory}
                    setCountWords={setCountWords}
                    setGetContent={setGetContent}
                />
            )
        })
    )
}
export default ListCategories;