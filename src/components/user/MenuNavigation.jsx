import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ApplictationContext } from '../Application';

const MenuNavigation = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    async function listCategories() {
        setValues({
            ...values,
            // getContent: [],
            showListCategories: true,
            showListWords: false,
            showSearchWord: false,
            // loadCategories: values.showListCategories
        });
    }
    const currentCategory = async () => {
        setValues({
            ...values,
            // getContent: [],
            currentNameCategory: values.getContent.categoryName,
            showListCategories: false,
            showSearchWord: false,
            showListWords: true,
            // loadWords: values.getContent.categoryName
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
                    values.showSearchWord === true &&
                    <Link
                        style={{
                            cursor: 'pointer'
                        }}
                        color="inherit"
                        onClick={currentCategory}
                    >
                        {values.getContent.categoryName}
                    </Link>
                }
                <Typography
                    color="textPrimary"
                >
                    {
                        values.showListWords === true &&
                        values.currentNameCategory
                    }
                    {
                        values.showSearchWord === true &&
                        values.valueSearchWord
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
export default MenuNavigation;