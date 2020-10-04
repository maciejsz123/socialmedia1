import React, { useState, useEffect } from 'react';
import io  from 'socket.io-client';
import { connect } from 'react-redux';

const socket = io('/')

function Chat(props) {
  const [state, setState] = useState({message: '', name: props.actualUser.name})
  const [chat, setChat] = useState([]);

  useEffect( () => {
    socket.on('message', ({ name, message}) => {
      setChat([...chat, {name, message}])
    })
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [chat])

  function onTextChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function sendMessage(e) {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('message', { name, message });
    setState({ message: '', name})
  }

  return (
    <div>
      <div>
        <h3>chat:</h3>
        <div>
          {chat.map( ({ message, name }, index) => (
            <div key={index}>
              <span>{name}: {message}</span>
            </div>
          ) )}
        </div>
      </div>
      <form>
        <label>{state.name}</label>
        <input
          type='text'
          onChange={(e) => onTextChange(e)}
          value={state.message}
          name='message'
        />
        <button onClick={sendMessage} className='btn btn-info'>send</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, {})(Chat);
