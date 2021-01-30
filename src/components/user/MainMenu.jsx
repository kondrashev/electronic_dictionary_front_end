import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import OpenMenu from './OpenMenu';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';

const MainMenu = (props) => {
    const { setShowListCategories, showListCategories, setShowListWords, showListWords, setShowSearchWord,
        setValueSearchWord, setGetContent, numberPageCategory, numberPageWord, setAlertMistakes,
        setTypeMistake, setCountCategories, setCountWords } = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto'
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const logout = () => {
        window.location.href = '/?logout'
    }
    async function searchWordGet(event) {
        if (event.keyCode == 13) {
            setShowListCategories(false);
            setShowListWords(false);
            setGetContent([]);
            setShowSearchWord(true);
            setValueSearchWord(event.target.value);
            let nameSearchWord = event.target.value;
            event.target.value = '';
            let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/search/word?wordName=${nameSearchWord}&userName=${sessionStorage.userName}`}`);
            response = await response.json();
            if (response.name !== null) {
                setGetContent(response);
            } else {
                setShowSearchWord(false);
                setTypeMistake(`This word didn't find-`);
                setAlertMistakes(true);
            }
        }
    }
    const classes = useStyles();
    return (
        <div
            className={classes.root}
            style={{
                position: 'relative'
            }}
        >
            <AppBar
                position="static"
            >
                <Toolbar>
                    <OpenMenu
                        numberPageCategory={numberPageCategory}
                        numberPageWord={numberPageWord}
                        setAlertMistakes={setAlertMistakes}
                        setTypeMistake={setTypeMistake}
                        setGetContent={setGetContent}
                        setCountCategories={setCountCategories}
                        setCountWords={setCountWords}
                        showListCategories={showListCategories}
                        showListWords={showListWords}
                    />
                    <Typography
                        className={classes.title}
                        variant="h6" noWrap
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        {props.login}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={searchWordGet}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Tooltip
                title='Logout'
                style={{
                    float: 'right',
                    marginRight: '320px',
                    marginTop: '-55px'
                }}
            >
                <IconButton
                    onClick={logout}
                >
                    <HomeIcon />
                </IconButton>
            </Tooltip>
        </div >
    );
}
export default MainMenu;