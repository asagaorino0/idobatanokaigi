import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { Store } from '../store/index';
import gravatar from './gravatar';
// import Paper from './Paper'
import Paper from '@material-ui/core/Paper';
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
    };

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
    }, []
        // eslint-disable-next-line 
    );
    console.log(messages)
    const messageEndRef = React.useRef();
    const scrollToLatest = () =>
        messageEndRef.current.scrollIntoView({ behavior: "auto", block: "start", inline: "center" });
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
    const classes = useStyles();

    return (

        <div>
            <button onClick={scrollToLatest}>goto</button>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
                        return (
                            // return messages.length === index + 1 ? (
                            // <Paper messages={messages} key={index} />

                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>

                                    <Grid item key={`${messages.id} `}>
                                        <Avatar className={classes.large} >   {`${messages.avater} `} </Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h6" component="h6">
                                            {`${messages.name} `}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {`${messages.message}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                        )
                        // ) : (
                        // <Paper messages={messages} key={index}

                        //     <Paper className={classes.paper}>
                        //         <Grid container wrap="nowrap" spacing={2}>
                        //             <Grid item key={`${messages.id} `}>
                        //                 <Avatar className={classes.large}
                        //                     ref={messageEndRef}
                        //                 >
                        //                     {`${messages.avater} `}
                        //                 </Avatar>
                        //             </Grid>
                        //             <Grid item xs>
                        //                 <Typography variant="h6" component="h6">
                        //                     {`${messages.name} `}
                        //                 </Typography>
                        //                 <Typography className={classes.pos} color="textSecondary">
                        //                     {`${messages.message}`}
                        //                 </Typography>
                        //             </Grid>
                        //         </Grid>
                        //     </Paper>
                        // )

                    })

                }
            </div>
            <div
                style={{ float: "left", clear: "both" }}
                ref={messageEndRef}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Avatar className={classes.green} >{avater}</Avatar>
                {/* <img src={globalState.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
                {/* <form className={classes.root} noValidate autoComplete="off">    */}
                <form>

                    <TextField
                        // required
                        id="standard-basic"
                        label="message!"
                        defaultValue=""
                        fullWidth={true}
                        // ref={messageEndRef}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleCreate}
                        autoFocus={true}
                        value={message}
                    />
                </form>
            </div>
            <br />
            <button onClick={handleDelete} color="secondary">{name}</button>
            <button onClick={handleCreate} color="secondary">{message}</button>        </div>
    );
};
export default Main;