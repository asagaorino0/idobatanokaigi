import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app"
import { deleteId } from './Main';

const useStyles = makeStyles({
    //    const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: 'spacing(0, 3)',
        backgroundColor: '#fff',
    },
    paper: {
        maxWidth: 400,
        margin: '5px 0px 5px auto',
        padding: '16px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    pink: {
        color: '#fff',
        backgroundColor: 'pink',
    },
    green: {
        color: '#fff',
        backgroundColor: 'green',
    },
    pos: {
        marginBottom: 10,
    },
});

export default function SimplePaper({ messages }) {
    const classes = useStyles();
    // const handleDelete = async () => {
    //     await deleteId();
    // }
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const deleteId = async () => {
        console.log('messages:', doc.id)
        await
            db.collection("messages").doc(`${messages.id}`).delete()
        // db.collection("messages").where("id", "==", messages.id)
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             doc.ref.delete();
        //         })

        //     })
    };

    return (
        <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={3}>
                <Grid item>
                    <Avatar className={classes.green}  >{messages.avater} </Avatar>
                    {/* <img src={messages.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h6">
                        {messages.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {messages.message}
                    </Typography>
                </Grid>
                {/* <Grid item xs> */}
                {/* {messages.id} */}
                <DeleteIcon onClick={deleteId} />
                {/* </Grid> */}
            </Grid>
        </Paper>
    );
    // return (
    //     <Card className={classes.root}>
    //         <CardContent>
    //             <Typography >
    //                 {/* <img src={messages.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
    //             </Typography>
    //             <Typography variant="h5" component="h5">
    //                 {messages.name}
    //             </Typography>
    //             <Typography className={classes.pos} color="textSecondary">
    //                 {messages.message}
    //             </Typography>
    //             {/* <Typography variant="body2" component="p">
    //                 {messages.avater}
    //             </Typography> */}
    //         </CardContent>
    //     </Card>
    // );
}
