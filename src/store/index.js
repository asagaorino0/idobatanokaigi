import React, { useReducer, createContext } from 'react'
import reducer from '../reducers/index'
const initialState = {
    data: [],
    id: [],
    name: [],
    messages: [],
    timestamp: 0,
    avater: [],
    capital: [],
    doc: []
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