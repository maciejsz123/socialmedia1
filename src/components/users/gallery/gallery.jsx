import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUsers } from '../../../actions/usersActions';
import UserHeader from '../userHeader/userHeader';
import './gallery.sass'

function Gallery(props) {
  const { fetchUsers, users } = props;
  const [images, setImages] = useState([]);
  const userId = window.location.pathname.split('/')[2];
  const user = users.filter( u => u._id === userId)[0];

  useEffect( () => {
    try {
      const user = users.filter( u => u._id === userId)[0];
      setImages(user.gallery);
    } catch(err) {
      console.log('loading');
    }
  }, [users, userId])


  function deleteImg(e, img) {
    e.preventDefault();
    axios.post(`/users/galleryimgdelete/${userId}`, {img: img})
    .then( () => {
      console.log('img deleted');
      fetchUsers();
    })
    .catch( err => console.log(err))
  }

  return(
    <div className='container'>
      <UserHeader user={user}/>
      {images.map( (img, i) => (
        <div key={i} className='img-container'>
          <img src={require(`../../../uploads/${img}`)}
            alt='img'
            className='gallery-img'
          />
          <img onClick={ (e) => deleteImg(e, img)}
            src={require(`../../../imgs/deleteX.png`)}
            alt='X'
            className='delete-img-button'
          />
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default connect(mapStateToProps, { fetchUsers })(Gallery);
