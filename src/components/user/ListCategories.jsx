import React from 'react';
import Category from './Category';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';
import { loadCategoriesFetchData } from '../../store/load_categories/action';

export const CategoriesContext = React.createContext();
const ListCategories = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { loadCatogories, getContent } = props;
    React.useEffect(() => {
        const data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${values.numberPage - 1}`}`,
            values,
            setValues: setValues
        }
        loadCatogories(data);
    }, [values.loadCategories]);
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
        getContent.map((category, index) => {
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
const mapStateToProps = state => {
    return {
        getContent: state.loadCategoriesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadCatogories: (data) => dispatch(loadCategoriesFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);