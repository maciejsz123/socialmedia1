import React, { useState } from 'react';
import { connect } from 'react-redux';
import './login.sass';
import axios from 'axios';
import { setActualUser } from '../../actions/usersActions';

function Login(props) {
  const [name, setName] = useState('jan');
  const [surname, setSurname] = useState('kowalski');
  const [login, setLogin] = useState('test');
  const [password, setPassword] = useState('test1');
  const [loginSelected, setLoginSelected] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  function submitLogin(e) {
    e.preventDefault();
    axios.post('/users/login', {
      username: login,
      password: password
    })
    .then( res => {
      const logged = res.data !== 'error';
      if(logged) {
        props.setActualUser(res.data);
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    })
  }

  function submitRegister(e) {
    e.preventDefault();
    axios.post('/users/register', {
      name: name,
      surname: surname,
      username: login,
      password: password
    })
    .then( res => {
      if(res.data === 'User added') {
        setLoginSelected(true);
        setRegisterError(false);
      } else if(res.data === 'user arleady exists') {
        setRegisterError(true);
      }
    })
  }

  return(
    <div className='center-div'>
      <div className='login-container'>
        <div className='login-header'>
          <h2 onClick={() => setLoginSelected(true)} className={loginSelected ? 'color-black' : 'color-grey'}>Log in</h2>
          <h2 onClick={() => setLoginSelected(false)} className={loginSelected ? 'color-grey' : 'color-black'}>Sign up</h2>
        </div>
        <div className='login-form-container'>
          {
            loginSelected ? (
              <div className='login-form'>
                <form onSubmit={submitLogin}>
                  { loginError ? <span className='form-input-error'>Your username or password may be incorrect.</span> : ''}
                  <input minLength='3' placeholder='login' type='text' value={login} onChange={(e) => { setLogin(e.target.value) }}></input>
                  <input minLength='5' placeholder='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                  <button className='btn btn-success'>login</button>
                </form>
              </div>
            ) : (
              <div className='login-form'>
                <form onSubmit={submitRegister}>
                  { registerError ? <span className='form-input-error'>user arleady exists.</span> : ''}
                  <input minLength='3' maxLength='15' placeholder='name' type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                  <input minLength='3' maxLength='20' placeholder='surname' type='text' value={surname} onChange={(e) => { setSurname(e.target.value) }}></input>
                  <input minLength='3' placeholder='login' type='text' value={login} onChange={(e) => { setLogin(e.target.value) }}></input>
                  <input minLength='5' placeholder='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                  <button className='btn btn-info'>register</button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, {setActualUser})(Login);
