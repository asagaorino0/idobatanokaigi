import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import Paper from './Paper'
import MyPaper from './MyPaper'
import StarPaper from './StarPaper'
import MyStarPaper from './MyStarPaper'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Store } from '../store/index'


// import Paper from '@material-ui/core/Paper';
// import { Store } from '../store/index';
// import gravatar from './gravatar';
// import Typography from '@material-ui/core/Typography';
// import DeleteIcon from '@material-ui/icons/Delete';
// import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';

const Main = () => {
    // const useStyles = makeStyles((theme) => ({
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
    });
    const { globalState, setGlobalState } = useContext(Store)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const { name } = useParams();
    const avater = name.charAt(0);
    const handleCreate = async (e) => {
        if (e.key === 'Enter') {
            await
                db.collection('messages').add({
                    name,
                    message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    avater,
                    star: 0,
                    avaterUrl: globalState.avater,
                })
                    .then((docref) => {
                        console.log("Document successfully written!:", docref.id);
                        setMessage("");

                        db.collection("messages").doc(docref.id).set({
                            id: docref.id,
                            // capital: true //←上書きされないおまじない
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
    console.log('gs:', globalState.avater)
    // console.log(messages)

    const messageEndRef = React.useRef();
    const scrollToLatest = () =>
        messageEndRef.current.scrollIntoView({ behavior: "auto", block: "start", inline: "center" })
    const sterId = async () => {
        console.log('messages:', doc.id)
    };
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
    const handleSet = async () => {
        await
            db.collection("messages").where("message", "==", "どんまい")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.set({
                            star: 0,
                            avaterUrl: "0",
                        }, { merge: true }//←上書きされないおまじない
                        )
                            .then(() => {
                                console.log("Document successfully written!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    })
                })
    }
    const classes = useStyles();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <button onClick={scrollToLatest}>goto</button>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
                        if (name === messages.name) {
                            if (messages.star > 0)
                                return (
                                    <MyStarPaper messages={messages} key={`${messages.id} `} />
                                )
                            else {
                                return (
                                    <MyPaper messages={messages} key={`${messages.id} `} />
                                )
                            }
                        }
                        else if (messages.star > 0)
                            return (
                                <StarPaper messages={messages} key={`${messages.id} `} />
                            )
                        else {
                            return (
                                <Paper messages={messages} key={`${messages.id} `} />
                            )
                        }
                    })
                }
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }} />
            {/* <Avatar className={classes.green} >{avater}</Avatar>
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
            </div> */}
            <div className={classes.root}>
                {globalState.avater === '0' &&
                    <Avatar className={classes.green} >{avater}</Avatar>}
                {globalState.avater !== '0' &&
                    <img src={globalState.avater} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                }
                <Grid item xs={10}>
                    <TextField
                        // inputRef={ref}
                        ref={messageEndRef}
                        label="message"
                        fullWidth={true}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={handleCreate}
                        autoFocus={true}
                    />
                </Grid>
            </div>
            <br />
            <button onClick={handleDelete} color="secondary">{name}</button>
            <button onClick={handleSet} color="secondary">set</button>
        </div>
    );
};
export default Main;