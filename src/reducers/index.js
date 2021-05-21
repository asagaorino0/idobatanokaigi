import { NAME_GOOGLE, NAME_EMAIL, NAME_LOGOUT, CHOICE_DOC, AVATER_URL } from '../actions/index'

const reducer = (state, action) => {
    switch (action.type) {
        case NAME_GOOGLE:
            return { ...state, name: action.name + "でログインしています。", nameH: action.name };
        case NAME_EMAIL:
            return { ...state, name: action.name + "でログインしています。", nameH: action.name };
        case NAME_LOGOUT:
            return { ...state, name: action.name, nameH: [] };
        case CHOICE_DOC:
            return {
                ...state,
                id: action.id, firstmessages: action.messages, timestamp: action.timestamp
                // eslint-disable-next-line 
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