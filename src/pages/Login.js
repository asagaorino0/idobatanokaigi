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
// import styles from './Counter.module.css';

// import { AVATER_URL } from '../actions/index'
const Login = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: 'spacing(0, 3)',
            backgroundColor: '#fff',
        },
        paper: {
            maxWidth: 400,
            margin: '5px 0px 5px 0px ',
            padding: '16px',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },
        pink: {
            color: '#fff',
            backgroundColor: 'pink',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
        },
        red: {
            color: 'red',
            // backgroundColor: 'yelloW',
        },
        pos: {
            marginBottom: 10,
        },
    });
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
            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }} > */}
            {/* <span className={classes.red} >★★★</span> */}
            <h3 style={{ color: '#3e3e3e' }}>井戸端会議 for Web</h3>
            <TextField
                required
                name="name"
                label="ニックネーム"
                defaultValue=""
                variant="outlined"
                onChange={e => setName(e.target.value)}
            />
            {/* <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br /> */}
            <br />
            {error}
            <Button variant="contained" onClick={handleClick} color="primary" disabled={name === ''}>Login</Button>
            {error}
            <Button variant="contained" onClick={googleClick} color="primary" >google</Button>
            {error}
        </Container>
    );
};

export default Login;
