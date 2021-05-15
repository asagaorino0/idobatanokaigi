import React, { useState, useContext, useReducer } from 'react';
import reducer from '../reducers/index';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { NAME_GOOGLE, NAME_EMAIL, NAME_LOGOUT } from '../actions/index'
import { Store } from '../store/index'
import { ADD_CREATE } from '../actions/index'
const Login = () => {
    const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    const [id, setId] = useState('')
    const db = firebase.firestore();


    // const handleClick = () => {
    //     firebase.auth().signInWithEmailAndPassword(email)
    //         .then((userCredential) => {
    //             // Signed in
    //             console.log('success login')
    //             // var user = userCredential.user;
    //             const name = (userCredential.user.email)
    //             history.push(`/Main/${name}`)
    //             setGlobalState({
    //                 type: NAME_EMAIL,
    //                 name,
    //             });
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             console.log(errorCode)
    //             console.log(errorMessage)
    //         });
    // }

    const handleClick = async () => {
        // dispatch({
        //     type: ADD_CREATE,
        //     // id,
        // name,
        //     // messages,
        //     // createAt,
        // })
        // //　↓確認用、後で消す。
        // console.log(`${id}`)
        // console.log(`${name}`)
        // console.log(`${messages}`)
        // console.log(`${createAt}`)
        // await db.collection('users').add({
        await db.collection('messages').add({
            name: (`${name}`),
            // timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((docRef) => {
                // dispatch({
                //     type: ADD_CREATE,
                //     id: docRef.id,
                //     name,
                //     // avater,
                // })
                // //　↓確認用、後で消す。
                // console.log(`${id}`)      
                // name.push(`/Main/`)
                const id = docRef.id
                console.log("Document written with ID: ", id)
                history.push(`/Main/${id}`)
                console.log("namae: ", name);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
        let namae = name
        // history.push(`/Main/${namae}`)
        console.log("namae: ", { namae });
    }





    return (
        <div>
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
            <Button variant="contained" onClick={handleClick} color="primary">Login</Button><br />
            <br />
            <Link to="/Main">Mainへ移動</Link>
            <br />
            {error}
        </div>
    );
};

export default Login;
