import React, { useEffect, useState } from 'react';
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
// import { Store } from '../store/index'
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
    const { namae } = useParams();
    // const { globalState, setGlobalState } = useContext(Store)
    const [count, setCount] = useState(1);
    const handleCreate = (e) => {
        // onKeyDown = (e) => {
        // //e.ke0になる
        if (e.key === 'Enter') {
            // e.preventDefault(),
            ////////////
            db.collection('messages').add({
                name: (`${namae}`),
                message: (`${message}`),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avater: (avaterUrl),
                capital: true //←上書きされないおまじない
            }, { merge: true }//←上書きされないおまじない
            )
                .then(() => {
                    console.log("Document successfully written!");
                    setMessage("");


                    // setCount(count + 1);
                    setCount(1);
                    console.log(count);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });


        }
    }
    // }
    // }


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
    const avaterUrl = 'https://picsum.photos/200?grayscale=' + count * 10
    console.log(avaterUrl)

    const handleChoice = async () => {
        await db.collection("messages").where("name", "==", "うたこ")
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
            db.collection("messages").where("name", "==", "yumeha")
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
                    messages.map((messages, i) => {
                        return (
                            <Card messages={messages} key={i} />
                            // <Card key={data.timestamp}> {data.name} : {data.message} </Card>
                        )
                    })
                }
            </div>

            <img src={avaterUrl} alt="" style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '50%' }} />
            <br />
            {/* return(
            {gravatar}
            ), */}
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
            {/* onKeyPress={e =>if (e.key == 'Enter')
                {
                      e.preventDefault()
                      {handleCreate}
                    }
                  }
                /> */}

            <br />
            {/* <Button variant="contained" onClick={handleAdd} color="primary">create</Button> */}
            <Button variant="outlined" onClick={handleChoice}>choice</Button>
            <Button variant="contained" onClick={handleDelete} color="secondary">delete</Button>
            <br />
            <br />

            {/* <ul>
                {messages &&

                    messages.map((message, index) => {
                        return (
                            <h5>
                                {message.name}
                                {message.messages}
                                {message.avatar}
                            </h5>
                        );
                    })}
            </ul> */}
        </div>

    );
};

export default Main;