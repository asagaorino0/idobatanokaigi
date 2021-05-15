import React, { useEffect, useState, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom'
import { createData, readData, choiceData, setData, upDate, Delete } from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import reducer from '../reducers/index';
import { ALL_MESSAGE, GET_TODO } from '../actions/index'
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { Table } from '@material-ui/core'
import { Store } from '../store/index'
import { Item } from "./Item";
// import { fetchGetTodoData, fetchGetTodoCheck } from '../apis/index'

// import { doc, getDoc } from "firebase/firestore";

const Main = () => {
    const [state, dispatch] = useReducer(reducer, []);
    // const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [timestamp, setTimestamp] = useState(0)
    const [messages, setMessages] = useState('');
    const db = firebase.firestore();
    // const [doc, getDoc] = firebase.firestore();
    const doc = firebase.firestore();
    const history = useHistory()
    // const { namae } = useParams();
    const { id } = useParams();
    const { globalState, setGlobalState } = useContext(Store)

    const handleCreate = async () => {
        console.log('id:', id)
        await
            db.collection("messages").doc(id).set({
                messages: (`${messages}`),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avater: ("https://picsum.photos/"),
                capital: true //←上書きされないおまじない
            }, { merge: true }//←上書きされないおまじない
            )
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            // .orderBy("time")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.data();
                });
                setMessages(messages);
            })
    }, []);

    console.log(messages)

    // console.log(globalState)

    // const handleSetdata = async () => {
    //     console.log(namae)
    //     console.log(`${messages}`)
    //     await
    //         db.collection("messages").where("name", "==", namae)
    //             .get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.set({
    //                         name: namae,
    //                         messages: (`${messages}`),
    //                         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //                     })
    //                         .then(() => {
    //                             console.log("Document successfully written!");
    //                         })
    //                         .catch((error) => {
    //                             console.error("Error writing document: ", error);
    //                         });
    //                 })
    //             })
    // }

    const handleRead = async () => {
        ///////get()//////ALL
        const querySnapshot = firebase.toString
        await db.collection("messages").get(doc)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // setData(querySnapshot.data)
                    setGlobalState({
                        type: ALL_MESSAGE,
                        // data: data().data,
                        id: doc.id,
                        name: doc.data().name,
                        messages: doc.data().messages,
                        timestamp: doc.data().timestamp,
                        // avater: doc.data().avater,
                        // capital: doc.data().capital
                    })
                })
                // console.log(doc)
            })

    }


    //     db.collection("messages").where("capital", "==", false)//条件設定
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 console.log(doc.id, " => ", doc.data());
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         });
    // }


    /////snapshot()////
    //     db.collection("messages").where("capital", "==", true)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 dispatch({
    //                     type: ALL_MESSAGE,
    //                     id: doc.id,
    //                     name: doc.name,
    //                     messages: doc.messages,
    //                     timestamp: doc.timestamp,
    //                     avater: doc.avater,
    //                     capital: doc.capital
    //                 });
    //             })
    //         })
    // }

    //     ///////get()//////ALL
    //     const querySnapshot = firebase.toString
    //     await db.collection("messages").get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 dispatch({
    //                     type: ALL_MESSAGE,
    //                     id: doc.data().id,
    //                     name: doc.data().name,
    //                     messages: doc.data().messages,
    //                     timestamp: doc.data().timestamp,
    //                     avater: doc.data().avater,
    //                     capital: doc.data().capital
    //                 })
    //             })
    //         })
    // }

    const handleChoice = async () => {
        await db.collection("messages").where("name", "==", "utako")
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
    const handleUpdate = async () => {
        await upDate();
    }
    const handleDelete = async () => {
        await
            db.collection("messages").where("name", "==", "utako")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
    }

    const handleClick = () => {
        history.push('/');
    };
    const sampleArray = [
        'aaa', 'bbb', 'ccc', 'ddd', 'eee'
    ]

    return (


        <div>
            <h3>Main</h3>
            <h1 style={{ color: '#3e3e3e' }}>Hello! {name}</h1>
            <br />
            <TextField
                required
                id="messages"
                label="message!"
                defaultValue=""
                variant="outlined"
                onChange={e => setMessages(e.target.value)}
            />
            <br />
            <Button variant="contained" onClick={handleCreate} color="primary">create</Button>
            {/* <Button variant="outlined" onClick={handleSetdata}>set</Button> */}
            <Button variant="outlined" onClick={handleRead}>read</Button>
            <Button variant="outlined" onClick={handleChoice}>choice </Button>
            <Button variant="outlined" onClick={handleUpdate}>update</Button>
            <Button variant="contained" onClick={handleDelete} color="secondary">delete</Button>
            <br />
            <br />
            <div>
                {
                    messages.map((data, id) => {
                        return (
                            <h5>{data.name}:{data.messages} </h5>
                        )
                    })
                }
            </div>
            {/* <div>
                {globalState.data.map((data) => {
                    return (
                        <h5>{data.name}</h5>
                    )
                })}
            </div> */}
            {/* <div>
                {sampleArray.map((data) => {
                    return (
                        <h5>{data}</h5>
                    )
                })}
            </div> */}
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