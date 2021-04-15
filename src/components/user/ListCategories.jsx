import React from 'react';
import Category from './Category';
import { ApplictationContext } from '../Application';

export const CategoriesContext = React.createContext();
const ListCategories = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
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
                <CategoriesContext.Provider
                    value={{
                        itemCategory: category,
                        indexCategory: index,
                        getIdCategory: getIdCategory
                    }}
                >
                    <Category
                        key={category.name}
                    />
                </CategoriesContext.Provider>
            )
        })
    )
}
export default ListCategories;