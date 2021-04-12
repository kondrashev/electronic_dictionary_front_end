import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
    const { values, setValues, getIdCategory } = props;
    return (
        values.getContent.map((category, index) => {
            return (
                <Category
                    key={category.name}
                    itemCategory={category}
                    indexCategory={index}
                    getIdCategory={getIdCategory}
                    values={values}
                    setValues={setValues}
                />
            )
        })
    )
}
export default ListCategories;