import React from 'react'
import { useParams } from 'react-router-dom'

function SecondPage() {
    // const history = useHistory();
    const { name } = useParams();
    return (
        <div>
            <h1>SecondPage</h1>
            <h1 style={{ color: 'blue' }}>{name}</h1>
        </div>
    )
}

export default SecondPage