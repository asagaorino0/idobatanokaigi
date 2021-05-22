import { NAME_GOOGLE, RESET_GOOGLE } from '../actions/index'

const reducer = (state, action) => {
    switch (action.type) {
        case NAME_GOOGLE:
            return { name: action.name, avater: action.avater };

        case RESET_GOOGLE:
            return { avater: action.avater = '0' };

        default:
            return state
    }
}

export default reducer