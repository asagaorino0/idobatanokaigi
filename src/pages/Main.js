import React, { useEffect, useState, useContext, useRef } from 'react';
// import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { Store } from '../store/index'
import gravatar from './gravatar'
import Paper from './Paper'
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
            flexGrow: 1,
            overflow: 'hidden',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
        },
    }));

    // const [state, dispatch] = useReducer(reducer, []);
    // const [id, setId] = useState('')
    // const [name, setName] = useState('')
    // const [timestamp, setTimestamp] = useState(0)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    // const [avater, setAvater] = useState('');
    const [url, setUrl] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const { name } = useParams();
    // const { avater } = useParams();
    const { globalState, setGlobalState } = useContext(Store);
    const [count, setCount] = useState(0);
    const avater = name.charAt(0)
    // setAvater(avater)
    console.log('avater:', avater)

    const handleCreate = (e) => {

        if (e.key === 'Enter') {
            //     // e.preventDefault(),
            //     ////////////
            // console.log('namae', name)

            db.collection('messages').add({
                name: (`${name}`),
                message: (`${message}`),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avater,
            }
                , { merge: true }//←上書きされないおまじない
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
    // console.log(globalState.avater)
    console.log(name)

    // const ref = useRef(null);

    // const handleChoice = async () => {
    //     await db.collection("messages").where("avater", "==", "https://picsum.photos/200?grayscale=0")
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 console.log(doc.id, " => ", doc.data())
    //             })
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         })
    // }
    // const handleDelete = async () => {
    //     await
    //         db.collection("messages").where("avater", "==", "https://picsum.photos/200?grayscale=10")
    //             .get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.delete();
    //                 })
    //             })
    // }
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, id) => {
                        return (
                            <Paper messages={messages} key={id} />
                            //     <Paper className={classes.paper}>
                            //         <Grid container wrap="nowrap" spacing={2}>
                            //             <Grid item key={id}>
                            //                 <Avatar className={classes.large} >{messages.avater} </Avatar>
                            //                 {/* <img src={messages.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
                            //             </Grid>
                            //             <Grid item xs>
                            //                 <Typography variant="h6" component="h6">
                            //                     {messages.name}
                            //                 </Typography>
                            //                 <Typography className={classes.pos} color="textSecondary">
                            //                     {messages.message}
                            //                 </Typography>
                            //             </Grid>
                            //         </Grid>
                            //     </Paper>
                            // )
                        )
                    })
                }
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Avatar className={classes.green} >{avater}</Avatar>
                {/* <img src={globalState.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
                <form className={classes.root2} noValidate autoComplete="off">
                    <TextField
                        required
                        id="message"
                        label="message!"
                        defaultValue=""
                        fullWidth={true}
                        variant="outlined"
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleCreate}
                        autoFocus={true}
                        value={message}
                    />
                </form>
            </div>

            {/* <br />
            <Button variant="outlined" onClick={handleChoice}>choice</Button>
            <Button variant="contained" onClick={handleDelete} color="secondary">delete</Button> */}
        </div>
    );
};
export default Main