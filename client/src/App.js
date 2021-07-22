import './App.css';
import Chat from './components/chat'
import Home from './components/home'
import {Router} from '@reach/router'
import React, {useState} from 'react'

function App() {

  const [nameState, setNameState] = useState({
    name:'',
    message:''
  })

  return (
    <div className="App">
        <Router>
          <Home path='/' nameState={nameState} setNameState={setNameState}/>
          <Chat path='/chatroom' nameState={nameState} setNameState={setNameState}/>
        </Router>
    </div>
  );
}

export default App;
