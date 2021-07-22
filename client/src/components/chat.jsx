import React, {useState, useEffect } from 'react'
import io from 'socket.io-client';


const Chat = props => {

    const {nameState, setNameState} = props


// must be here to open the socket needed
    const [socket] = useState(() => io(':8000'));

    const [messages, setMessages] = useState([])

    const [formState, setFormState] = useState('')

    useEffect(() => {
        // socket.on('new_message_from_server', msg =>
        // setMessages(prevMessages => {
        //     return [ ...prevMessages, msg]
        // }))
        socket.on('new_message_from_server', data =>{

            setMessages(data)
            console.log(messages)
        })
        return ()=> socket.disconnect(true);
    },[]);


    const handleSubmit = e => {
        e.preventDefault()
        console.log(nameState)
        socket.emit('event_from_client', nameState)
        // io.emit({main: 'person_a'}, data)
    }

    return (
        <div>
            <h1>MERN Chat</h1>
            {
                messages.map((message, i)=> {
                    return(
                        <p key={i}>{message.name}:{message.message}</p>
                    )
                }) 
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name='msg' onChange={(e) => setNameState({...nameState, message:e.target.value})}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Chat;

