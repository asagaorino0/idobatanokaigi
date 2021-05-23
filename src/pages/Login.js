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
import CssBaseline from '@material-ui/core/CssBaseline';
// import styles from './Counter.module.css';

// import { AVATER_URL } from '../actions/index'
const Login = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    // const useStyles = makeStyles({
    //     root: {
    //         flexGrow: 1,
    //         overflow: 'hidden',
    //         padding: 'spacing(0, 3)',
    //         backgroundColor: '#fff',
    //     },
    //     paper: {
    //         maxWidth: 400,
    //         margin: '5px 0px 5px 0px ',
    //         padding: '16px',
    //         boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    //     },
    //     pink: {
    //         color: '#fff',
    //         backgroundColor: 'pink',
    //     },
    //     green: {
    //         color: '#fff',
    //         backgroundColor: 'green',
    //     },
    //     red: {
    //         color: 'red',
    //         // backgroundColor: 'yelloW',
    //     },
    //     pos: {
    //         marginBottom: 10,
    //     },
    // });


    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
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
            {/* <h3 style={{ color: '#3e3e3e' }}>井戸端会議 for Web</h3>
            <TextField
                required
                name="name"
                label="ニックネーム"
                defaultValue=""
                variant="outlined"
                onChange={e => setName(e.target.value)}
            />
            <br />
            {error}
            <Button variant="contained" onClick={handleClick} color="primary" disabled={name === ''}>Login</Button>
            {error}
            <Button variant="contained" onClick={googleClick} color="primary" >google</Button>
            {error} */}

            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                {/* <span className={classes.red} >★★★</span> */}
                <Typography component="h1" variant="h5">
                    井戸端会議 for Web
                </Typography>
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
                    <Grid container>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            // disabled={name === ''}
                            onClick={googleClick}
                        >
                            Google In
                    </Button>
                        {/* <Grid container> */}




                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>
    );

};

export default Login;
