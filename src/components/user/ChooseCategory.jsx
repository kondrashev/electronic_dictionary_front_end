import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { getAllCategoriesFetchData } from '../../store/get_all_categories/action';

const ChooseCategory = (props) => {
    const { selectCategory, getAllCategories, allCategories } = props;
    React.useEffect(() => {
        getAllCategories(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/all/categories?userName=${sessionStorage.userName}`}`);
    }, []);
    return (
        <FormControl
            variant="outlined"
            style={{
                width: '330px'
            }}
        >
            <InputLabel
                htmlFor="outlined-age-native-simple"
            >
                Categories
            </InputLabel>
            <Select
                native
                label='name'
                onChange={selectCategory}
                inputProps={{
                    name: 'name'
                }}
            >
                <option aria-label="None" value="" />
                {
                    allCategories.map((category) =>
                        <option
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    )
                }
            </Select>
        </FormControl>
    )
}
const mapStateToProps = state => {
    return {
        allCategories: state.getAllCategoriesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: (url) => dispatch(getAllCategoriesFetchData(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategory);