import { GET_TODO, NAME_GOOGLE, NAME_EMAIL, NAME_LOGOUT, CHOICE_DOC, AVATER_URL } from '../actions/index'
// import firebase from "firebase/app"

const reducer = (state, action) => {
    switch (action.type) {
        case NAME_GOOGLE:
            return { ...state, name: action.name + "でログインしています。", nameH: action.name };
        case NAME_EMAIL:
            return { ...state, name: action.name + "でログインしています。", nameH: action.name };
        case NAME_LOGOUT:
            return { ...state, name: action.name, nameH: [] };
        // case ADD_CREATE:
        //     const create = {
        //         id: action.id, name: action.name, messages: action.messages
        //     };
        //     // const id = state.length + 1;
        //     // return [...state, { id, ...create }];
        //     return { ...state, id: action.id, name: action.name, messages: action.messages }


        case CHOICE_DOC:
            // const db = firebase.firestore();
            // const doc = firebase.firestore();
            return {
                ...state,
                id: action.id, firstmessages: action.messages, timestamp: action.timestamp

            },
                console.log(...state, {
                    id: action.id, firstmessages: action.messages, timestamp: action.timestamp
                })
        case AVATER_URL:
            return { avater: action.avater }

        default:
            return state
    }
}

export default reducer