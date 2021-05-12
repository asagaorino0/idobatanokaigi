import React, { useEffect, useState, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom'
import { createData, readData, choiceData, setData, upDate, Delete } from '../config/firebase';
import TextField from '@material-ui/core/TextField';
import reducer from '../reducers/index';
import { ADD_CREATE, CHOICE_DOC } from '../actions/index'
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { Table } from '@material-ui/core'
import { Store } from '../store/index'
// import { messagesRef } from '../config/firebase';

const Main = () => {
    const [state, dispatch] = useReducer(reducer, []);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [messages, setMessages] = useState('')
    const [createAt, setCreateAt] = useState(0)
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const history = useHistory()
    const { namae } = useParams();
    const { globalState, setGlobalState } = useContext(Store)
    const messagesRef = db.collection('messages')

    // useEffect(() => {
    //     messagesRef.orderBy('createAt', 'asc').onSnapshot(function (querySnapshot) {
    //         //   const messageList: MessageListType[] = [];
    //         querySnapshot.forEach((doc) => {
    //             const temp = {
    //                 id: doc.id,
    //                 name: doc.data().name,
    //                 message: doc.data().message,
    //                 createAt: doc.data().createAt,
    //             };
    //             // messageList.push(temp);
    //         });
    //         // setMessages(messageList);
    //     });
    // }, []);








    const handleCreate = async () => {
        dispatch({
            type: ADD_CREATE,
            id,
            name,
            messages,
            createAt,
        })
        //　↓確認用、後で消す。
        console.log(`${id}`)
        console.log(`${name}`)
        console.log(`${messages}`)
        // console.log(`${createAt}`)
        // await db.collection('users').add({
        await db.collection('messages').doc(`${id}`).set({
            // id: (`${id}`),
            name: (`${id}`),
            messages: (`${messages}`),
            avater: ("https://picsum.photos/"),
            capital: true,
        },
            { merge: true })
            .then((docRef) => {
                var docRef = db.collection('messages').doc(`${id}`);
                var updateTimestamp = docRef.update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                // alert(first + last + " が登録されました。")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
        // await createData(); 、、、ちょーむず。
    }


    const handleSetdata = async () => {
        // await setData()
        var docRef = db.collection("messages").doc("うたこまま");

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    const handleRead = async () => {
        // await readData();

        const querySnapshot = firebase.toString

        await db.collection("messages").get().then((querySnapshot) => {
            // const data = [] => {
            querySnapshot.forEach((doc) => {
                const temp = {
                    id: doc.id,
                    name: doc.data().name,
                    message: doc.data().messages,
                    // createAt: doc.data().createAt,
                }
                // });
                //   messageList.push(temp);
                console.log(temp);
                // console.log(globalState);
            })
        })

    }

    //number,map,,,,
    const handleChoice = async () => {
        await db.collection("messages").where("name", "==", `${id}`)
            // await db.collection("users").where("born", "==", 1815)
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
        await Delete();
    }
    const handleClick = () => {
        history.push('/');
    };
    return (
        <div>
            <h3>Main</h3>
            <h1 style={{ color: '#3e3e3e' }}>Hello! {namae}</h1>
            <TextField
                required
                id="id"
                label="ニックネーム"
                defaultValue="ニックネーム"
                variant="outlined"
                onChange={e => setId(e.target.value)}
            />
            <br />
            {/* <TextField
                required
                id="first"
                label="必須"
                defaultValue="姓"
                variant="outlined"
                onChange={e => setName(e.target.valu/e)}
            /> */}
            {/* <TextField
                required
                id="name"
                label="必須"
                defaultValue="name"
                variant="outlined"
                onChange={e => setName(e.target.value)}
            /> */}
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
            <Button variant="outlined" onClick={handleSetdata}>set</Button>
            <Button variant="outlined" onClick={handleRead}>read</Button>
            <Button variant="outlined" onClick={handleChoice}>choice </Button>
            <Button variant="outlined" onClick={handleUpdate}>update</Button>
            <Button variant="contained" onClick={handleDelete} color="secondary">delete</Button>
            <br />
            <br />
            <Button variant="outlined" onClick={handleClick}>戻る</Button>

            <div>
                <Table striped bordered hover>
                    {/* <thead>
                        <tr>
                            <th>name</th>
                            <th>messages</th>
                            <th>timestamp</th>
                        </tr>
                    </thead> */}
                    {/* <tbody>
                        {
                            globalState.map((data, index) => {
                                return (

                                    <tr key={data.id}>
                                        <td>{data.messages}</td>
                                        <td>{data.timestamp}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody> */}
                </Table>
            </div>

        </div>
    );
};

export default Main;