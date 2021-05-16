import React, { useState } from 'react';
// import reducer from '../reducers/index';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
// import { NAME_GOOGLE, NAME_EMAIL, NAME_LOGOUT } from '../actions/index'
// import { Store } from '../store/index'
// import { ADD_CREATE } from '../actions/index'
const Login = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    // const { globalState, setGlobalState } = useContext(Store)
    // const [id, setId] = useState('')
    // const db = firebase.firestore();


    const handleClick = async () => {
        let namae = name
        // history.push(`/Main/${namae}`)
        history.push(`/Main/${namae}`)
        console.log("namae: ", name);
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
