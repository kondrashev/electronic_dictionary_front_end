import React from 'react';
import Category from './Category';

const ListCategories = (props) => {
    const { values, setValues } = props;
    const getIdCategory = (event) => {
        let listId = values.listIdCategories;
        if (event.target.checked === true) {
            listId.push(parseInt(event.target.value));
            setValues({
                ...values,
                listIdCategories: listId,
                showDeleteButtonCategory: true
            });
        } else {
            setValues({
                ...values,
                listIdCategories: values.listIdCategories.filter(item => item != parseInt(event.target.value)),
                showDeleteButtonCategory: values.listIdCategories.length - 1 == 0 && false
            });
        }
    }
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