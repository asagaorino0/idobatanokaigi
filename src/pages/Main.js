import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { Store } from '../store/index';
import gravatar from './gravatar';
import Paper from './Paper'
import MyPaper from './MyPaper'
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';


const Main = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
        root2: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
            flexGrow: 0,
            overflow: 'hidden',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
    }));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [url, setUrl] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const { name } = useParams();
    const { globalState, setGlobalState } = useContext(Store);
    const [count, setCount] = useState(0);
    const avater = name.charAt(0);

    // const ref = useRef<HTMLDivElement>(null);



    const handleCreate = async (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault(),
            //     ////////////
            // console.log('namae', name)
            // console.log(message)
            await
                db.collection('messages').add({
                    name,
                    message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    avater,
                })
                    .then((docref) => {
                        console.log("Document successfully written!:", docref.id);
                        setMessage("");

                        db.collection("messages").doc(docref.id).set({
                            id: docref.id,
                            capital: true //←上書きされないおまじない
                        }, { merge: true }//←上書きされないおまじない
                        )
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    })
        }
    };

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.id && doc.data()
                });
                setMessages(messages);
            })
    }, []

    );
    console.log(messages)
    console.log(doc.id)
    const messageEndRef = React.useRef();
    const scrollToLatest = () =>
        messageEndRef.current.scrollIntoView({ behavior: "auto", block: "start", inline: "center" })

    // console.log(globalState.avater)
    // console.log(name)


    const handleDelete = async () => {
        await
            db.collection("messages").where("name", "==", name)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
    };
    const deleteId = async () => {
        console.log(messages.id)
        // await
        // db.collection("messages").doc(id).delete()

        //         db.collection("messages").where("id", "==", messages.id)
        //             .get()
        //             .then((querySnapshot) => {
        //                 querySnapshot.forEach((doc) => {
        //                     doc.ref.delete();
        //                 })
        //             })
    };
    const classes = useStyles();


    return (

        <div>
            <button onClick={scrollToLatest}>goto</button>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
                        // { `${messages.id} ` }
                        < DeleteIcon color="secondary" onClick={deleteId} />
                        if (name === messages.name)
                            return (
                                <MyPaper messages={messages} key={`${messages.id} `} />

                            )
                        else {
                            return (
                                <Paper messages={messages} key={`${messages.id} `} />
                            )
                        }

                    })
                }
            </div>
            {/* <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
                        if (name === messages.name)
                            return (
                                <MyPaper messages={messages} key={`${messages.id} `} />
                            )
                        else {
                            return (
                                <Paper messages={messages} key={`${messages.id} `} />
                            )
                        }
                    })
                }
            </div> */}




            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Avatar className={classes.green} >{avater}</Avatar>
                <TextField
                    // required
                    id="standard-basic"
                    label="message!"
                    defaultValue=""
                    fullWidth={true}
                    ref={messageEndRef}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleCreate}
                    autoFocus={true}
                    value={message}
                />

            </div>
            <br />
            <button onClick={handleDelete} color="secondary">{name}</button>
            <button onClick={deleteId} color="secondary">id</button>        </div>
    );
};
export default Main;