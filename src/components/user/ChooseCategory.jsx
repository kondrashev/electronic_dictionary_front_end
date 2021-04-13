import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { getAllCategories } from './GetAllCategories';

const ChooseCategory = (props) => {
    const { selectCategory, values } = props;
    React.useEffect(() => {
        getAllCategories(props);
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
                    values.allCategories.map((category) =>
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