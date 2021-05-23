import React, { useState, useContext } from 'react';
// import reducer from '../reducers/index';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { NAME_GOOGLE, RESET_GOOGLE } from '../actions/index'
import { Store } from '../store/index'
import StarIcon from '@material-ui/icons/Star';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logo from '../img/0730.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
// import logo from './img';
// import styles from './Counter.module.css';

// import { AVATER_URL } from '../actions/index'
const Login = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(7),
            // backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        red: {
            color: 'red',
        },
    }));
    const classes = useStyles();
    const googleClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/admin.directory.customer.readonly');
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().languageCode = 'jp';
        // To apply the default browser preference instead of explicitly setting it.
        // firebase.auth().useDeviceLanguage();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user)
                // ...
                const name = (user.displayName)
                const avaterGoogle = (user.photoURL)
                history.push(`/Main/${name}`)
                setGlobalState({
                    type: NAME_GOOGLE,
                    name,
                    avater: avaterGoogle,
                });
                console.log(avaterGoogle)
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    const handleClick = async () => {
        setGlobalState({
            type: RESET_GOOGLE,
            avater: globalState.avater,
        })
        history.push(`/Main/${name}`)
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {/* <span className={classes.red} >★★★</span> */}
                <div className={classes.avatar}>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <Typography component="h1" variant="h5">
                    井戸端会議 for Web
                </Typography>
                <span className={classes.red} >★★★</span>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="name"
                        label="ニックネーム"
                        defaultValue=""
                        autoComplete="email"
                        autoFocus
                        onChange={e => setName(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={name === ''}
                        onClick={handleClick}
                    >
                        Sign In
                    </Button>
                    <Grid container />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={googleClick}
                        color="primary"
                    >
                        google in
                            </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
