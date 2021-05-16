import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom'
// import { createData, readData, choiceData, setData, upDate, Delete } from '../config/firebase';
import TextField from '@material-ui/core/TextField';
// import reducer from '../reducers/index';
// import { ALL_MESSAGE, GET_TODO } from '../actions/index'
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
// import { Table } from '@material-ui/core'
import { Store } from '../store/index'
// import { Item } from "./Item";
import Card from './Card'
import gravatar from './gravatar'

// import { fetchGetTodoData, fetchGetTodoCheck } from '../apis/index'

// import { doc, getDoc } from "firebase/firestore";

const Main = () => {
    // const [state, dispatch] = useReducer(reducer, []);
    // const [id, setId] = useState('')
    // const [name, setName] = useState('')
    // const [timestamp, setTimestamp] = useState(0)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [url, setUrl] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    // const history = useHistory()
    const { name } = useParams();
    const { avater } = useParams();
    const { globalState, setGlobalState } = useContext(Store)
    const [count, setCount] = useState(0);
    const handleCreate = (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault(),
            ////////////
            db.collection('messages').add({
                name: (`${name}`),
                message: (`${message}`),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avater: (globalState.avater),
            }, { merge: true }//←上書きされないおまじない
            )
                .then(() => {
                    console.log("Document successfully written!");
                    setMessage("");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }
    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.data();
                });
                setMessages(messages);
            })
    }, []);
    console.log(messages)
    console.log(globalState.avater)

    const handleChoice = async () => {
        await db.collection("messages").where("avater", "==", "https://picsum.photos/200?grayscale=0")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data())
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }
    const handleDelete = async () => {
        await
            db.collection("messages").where("avater", "==", "https://picsum.photos/200?grayscale=10")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
    }
    return (
        <div>
            <div>
                {
                    messages.map((messages, timestamp) => {
                        return (
                            <Card messages={messages} key={timestamp} />
                        )
                    })
                }
            </div>

            <img src={globalState.avater} alt="" style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '50%', width: '70px', height: '70px' }} />
            <br />
            {/* 
            {gravatar}
            */}
            <TextField
                required
                id="message"
                label="message!"
                defaultValue=""
                width="100%"
                variant="outlined"
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleCreate}
                autoFocus={true}
                value={message}
            />
            <br />
            <Button variant="outlined" onClick={handleChoice}>choice</Button>
            <Button variant="contained" onClick={handleDelete} color="secondary">delete</Button>
        </div>

    );
};
export default Main