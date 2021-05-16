import React, { useState, useContext } from 'react';
// import reducer from '../reducers/index';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
// import { NAME_GOOGLE, AVATER_URL, NAME_LOGOUT } from '../actions/index'
import { Store } from '../store/index'
import { AVATER_URL } from '../actions/index'
const Login = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    const { globalState, setGlobalState } = useContext(Store)
    const [avater, setAvater] = useState(0)
    // const db = firebase.firestore();


    const handleClick = async () => {
        const date = new Date()
        // const Y = date.getFullYear()
        // const M = ("00" + (date.getMonth()+1)).slice(-2)
        // const D = ("00" + date.getDate()).slice(-2)
        const h = ("00" + date.getHours()).slice(-2)
        const m = ("00" + date.getMinutes()).slice(-2)
        const s = ("00" + date.getSeconds()).slice(-2)
        const no = h + m + s
        const avater = 'https://picsum.photos/200?=' + no
        setAvater('https://picsum.photos/200?=' + no);
        setGlobalState({
            type: AVATER_URL,
            avater,
        });
        console.log('avatere:', avater)
        history.push(`/Main/${name}`)
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
            {error}

            <Button variant="contained" onClick={handleClick} color="primary" disabled={name === ''}>Login</Button>
            {error}
        </div>
    );
};

export default Login;
