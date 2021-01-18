import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const ChooseCategory = (props) => {
    const [allCategories, setAllCategories] = React.useState([]);
    props.showChooseCategory === true &&
        (async () => {
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/all/categories?userName=${sessionStorage.userName}`}`);
            response = await response.json();
            setAllCategories(response);
        })();
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
                onChange={props.selectCategory}
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
export default ChooseCategory;