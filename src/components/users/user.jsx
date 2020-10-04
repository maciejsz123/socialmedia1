import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [user, setUser] = useState(null);

  useEffect( () => {
    const id = window.location.pathname.substring(6);
    axios.get(`/users/${id}`)
    .then( (v) => setUser(v.data))
    .catch( err => console.log(err))
  }, [])

  if(!user) {
    return <div>Error ocurred</div>
  }

  return (
    <div className='container'>
      <div>{user.name}</div>
      <div>{user.surname}</div>
      <div><img src={require(`../../uploads/${user.avatar}`)} alt='avatar'/></div>
    </div>
  )
}

export default User;
