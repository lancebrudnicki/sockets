import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { io } from 'socket.io-client'



const Home = props => {

    const {nameState, setNameState} = props

    const [socket] = useState(() => io(':8000'));

    const changeHandler = e => {
        setNameState({
            ...nameState,
            name: e.target.value,
            message:`${nameState.name} has joined the Chatroom`
        })
    }

    const handleSubmit = e =>{
        e.preventDefault()
        //make sure to send to the socket.on
        socket.emit('event_from_client', nameState)
        navigate('/chatroom')
    }

    return(
        <div>
            <h1>MERN Chat</h1>
            <div>
                <h2>Get started right now!</h2>
                <form onSubmit={handleSubmit}>
                    I want to start chatting with the name...
                    <input type="text" name="name" onChange={changeHandler}></input>
                    <button>Start Chatting</button>
                </form>
            </div>
        </div>
    )


}

export default Home;