import React, { useReducer, createContext } from 'react'
import reducer from '../reducers/index'
const initialState = {
    // count: 0,
    // user_data: [],
    // title: [],
    id: [],
    name: [],
    // nameH: [],
    masseges: [],
    // data: [],
    // born: 0,
}

export const Store = createContext({
    globalState: initialState,
    setGlobalState: () => null
})

const StoreProVider = ({ children }) => {
    const [globalState, setGlobalState] = useReducer(reducer, initialState)
    return (
        <Store.Provider value={{ globalState, setGlobalState }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProVider