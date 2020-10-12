import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUsers } from '../../actions/usersActions';

function Gallery(props) {
  const { fetchUsers, users } = props;
  const [images, setImages] = useState([]);
  const user = window.location.pathname.split('/')[2];
  console.log(user);
  useEffect( () => {
    try {
      const images = users.filter( u => u._id === user)[0].gallery;
      setImages(images);
    } catch(err) {
      console.log('loading');
    }
  }, [users, user])


  function deleteImg(e, img) {
    e.preventDefault();
    axios.post(`/users/galleryimgdelete/${user}`, {img: img})
    .then( () => {
      console.log('img deleted');
      fetchUsers();
    })
    .catch( err => console.log(err))
  }

  return(
    <div>
      {images.map( (img, i) => (
        <div key={i}>
          <img src={require(`../../uploads/${img}`)} alt='img' style={{width: '250px'}}/>
          <button type='button' className='btn btn-warning' onClick={ (e) => deleteImg(e, img)}>delete</button>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default connect(mapStateToProps, { fetchUsers })(Gallery);
