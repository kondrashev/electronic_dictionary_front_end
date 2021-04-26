import React from 'react';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableWords from './TableWords';
import SearchWord from './SearchWord';
import PaginationButtons from './PaginationButtons';
import ListCategories from './ListCategories';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';
import { countPagesFetchData } from '../../store/count_pages/action';
import { deleteCategoriesFetchData } from '../../store/update_categories/action_delete';

const Content = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getCountPages, categoriesDelete } = props;
    React.useEffect(() => {
        getCountPages(values.changeCountPages);
    }, [values.changeCountPages]);
    const deleteCategories = () => {
        let data = {
            url: `${'https://cors-anywhere.herokuapp.com/'}${`https://${values.prefixURL}.herokuapp.com/delete/categories`}`,
            listIdCategories: values.listIdCategories,
            values: values,
            setValues: setValues
        }
        categoriesDelete(data);
    }
    return (
        < div >
            <div
                className='list_categories'
                style={{
                    width: 'auto',
                    position: 'absolute',
                    top: '110px',
                    left: '53.5%',
                    transform: 'translate(-50%,0)'
                }}
            >
                {
                    values.showDeleteButtonCategory &&
                    <List
                        style={{
                            float: 'right'
                        }}
                    >
                        <ListItemSecondaryAction >
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                className='category_delete'
                                onClick={deleteCategories}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </List>
                }
                {
                    values.showListCategories &&
                    <ListCategories />
                }
                {
                    values.showListWords &&
                    <TableWords />
                }
                {
                    values.showSearchWord &&
                    <SearchWord />
                }
            </div>
            <PaginationButtons />
        </div >
    )
}
const mapStateToProps = state => {
    return {
        pagesCount: state.countPagesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getCountPages: (data) => dispatch(countPagesFetchData(data)),
        categoriesDelete: (data) => dispatch(deleteCategoriesFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);