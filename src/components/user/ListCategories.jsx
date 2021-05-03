import React from 'react';
import Category from './Category';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';
import { loadCategoriesFetchData } from '../../store/load_categories/action';

export const CategoriesContext = React.createContext();
const ListCategories = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { loadCatogories, getContent, updateCategories } = props;
    React.useEffect(() => {
        const data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefixURL}.herokuapp.com/get/categories?userName=${sessionStorage.userName}&page=${values.numberPageCategories - 1}`}`,
            values,
            setValues: setValues
        }
        loadCatogories(data);
    }, [values.loadCategories, updateCategories]);
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
        getContent.map((category) => {
            return (
                <CategoriesContext.Provider
                    value={{
                        itemCategory: category,
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
        getContent: state.loadCategoriesReducer,
        updateCategories: state.updateCategoriesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadCatogories: (data) => dispatch(loadCategoriesFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);