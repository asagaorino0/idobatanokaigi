import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { NAME_EMAIL } from '../actions/index'
import { Store } from '../store/index'
const CreateUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    const handleClick = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log('success login')
                var user = userCredential.user;
                const name = (user.email)
                history.push(`/Main/${name}`)
                // ...
                setGlobalState({
                    type: NAME_EMAIL,
                    name,
                });
                console.log(globalState.name)
                // Construct the email link credential from the current URL.
                var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
                    email, window.location.href);
                // Re-authenticate the user with this credential.
                firebase.auth().currentUser.reauthenticateWithCredential(credential)
                    .then((usercred) => {
                        // The user is now successfully re-authenticated and can execute sensitive
                        // operations.
                    })
                    .catch((error) => {
                        // Some error occurred.
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                // ..
            });
    }
    return (
        <div>
            <h2>CreateUser</h2>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <Button variant="outlined" onClick={handleClick}>Create</Button>
            <Link to='/' >戻る</Link>
        </div>
    );
};

export default CreateUser;