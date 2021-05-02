import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ApplictationContext } from '../Application';
import { connect } from 'react-redux';

const MenuNavigation = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { searchWord } = props;
    const listCategories = () => {
        setValues({
            ...values,
            showListCategories: true,
            returnListCategories: false,
            showListWords: false,
            showSearchWord: false,
            loadCategories: values.showListCategories
        });
    }
    const currentCategory = () => {
        setValues({
            ...values,
            currentNameCategory: searchWord.categoryName,
            showListCategories: false,
            showSearchWord: false,
            showListWords: true,
            loadWords: searchWord.categoryName
        });
    }
    return (
        <div
            style={{
                width: '300px',
                position: 'absolute',
                top: '80px',
                left: '50%',
                transform: 'translate(-50%,0)'
            }}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                <Link
                    style={{
                        cursor: 'pointer'
                    }}
                    color="inherit"
                    onClick={listCategories}
                >
                    Categories
                </Link>
                {
                    values.showSearchWord &&
                    <Link
                        style={{
                            cursor: 'pointer'
                        }}
                        color="inherit"
                        onClick={currentCategory}
                    >
                        {searchWord.categoryName}
                    </Link>
                }
                <Typography
                    color="textPrimary"
                >
                    {
                        values.showListWords &&
                        values.currentNameCategory
                    }
                    {
                        values.showSearchWord &&
                        searchWord.name
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        searchWord: state.searchWordReducer
    };
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(MenuNavigation);