import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
    return (
        props.categories.map((category, index) => {
            return (
                <Category
                    key={category.name}
                    item={category}
                    index={index}
                    getIdCategory={props.getIdCategory}
                    setShowListCategories={props.setShowListCategories}
                    setShowListWords={props.setShowListWords}
                    showListWords={props.showListWords}
                    setCurrentNameCategory={props.setCurrentNameCategory}
                    numberPageCategory={props.numberPageCategory}
                    setGetContent={props.setGetContent}
                    setCountWords={props.setCountWords}
                />
            )
        })
    )
}
export default ListCategories;