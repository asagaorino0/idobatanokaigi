
import React, { useContext } from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom';
import { Store } from '../store/index'
const Header = () => {
    const history = useHistory()
    const { nameH } = useParams();
    // console.log("0", nameH)
    const { globalState } = useContext(Store)
    const onTop = () => {
        history.push('/');
        console.log("1", globalState.nameH, nameH)
    }
    const onClick = () => {
        const nameH = (globalState.nameH)
        history.push(`/Main/${nameH}`);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <h3>GlobalState</h3>
                <h3 onClick={onTop}>☆Login:</h3>
                <h3 onClick={onClick}>{globalState.nameH}</h3>
                <h1 onClick={onClick}>{nameH}</h1>

            </Toolbar>
        </AppBar>
    );
}

export default Header
