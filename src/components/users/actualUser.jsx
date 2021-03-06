import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setActualUser } from '../../actions/usersActions'
import { Link } from "react-router-dom";
import './users.sass'

function ActualUser(props) {
  const { setActualUser, actualUser } = props;

  useEffect( () => {
    axios.get(`/users/${props.actualUser._id}`)
    .then( res => {
      setActualUser(res.data);
    })
    .catch(err => console.log(err))

  }, [setActualUser, props.actualUser._id])

  let avatar = null;
  try {
    avatar = require(`../../uploads/${actualUser.avatar}`);
  } catch(err) {
    console.log('loading file');
  }

  function sendFile(e) {
    e.preventDefault();
    document.getElementById('avatar-change').click();
  }

  function onChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(`/users/avatarupdate/${props.actualUser._id}`, formData, config)
    .then( () => console.log('img changed'))
    .catch( (err) => {
      console.log(err);
    })
  }

  function deleteAvatar(e) {
    e.preventDefault();

    axios.delete(`/users/avatardelete/${props.actualUser._id}`)
    .then( () => console.log('img deleted'))
    .catch( (err) => {
      console.log(err);
    })
  }

  if(Object.keys(props.actualUser).length === 0 && props.actualUser.constructor === Object) {
    return <div></div>
  }

  return (
    <div className='container actual-user'>
      <div className='d-flex flex-column'>
        <div className='avatar-img-container'>
          <img src={avatar} alt='avatar' className='avatar-img'/>
          <div>
            <input type='file' id='avatar-change' onChange={onChange} name='avatar'/>
            <img onClick={sendFile} src={require('../../imgs/pen.png')} className='change-avatar-button' alt='change'/>
            <img onClick={deleteAvatar} src={require('../../imgs/delete.png')} className='delete-avatar-button' alt='delete avatar' />
          </div>
        </div>
        <div className='avatar-info-container'>
          <span><Link to={`/user/${props.actualUser._id}`}>{props.actualUser.name} {props.actualUser.surname}</Link></span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, { setActualUser })(ActualUser);
