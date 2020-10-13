import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/usersActions';

function EditDetails(props) {
  const [name, setName] = useState(props.user.name);
  const [surname, setSurname] = useState(props.user.surname);

  useEffect( () => {
    const currentUser = props.users.filter( (user) => user._id === props.user._id);
    try {
      setName(currentUser[0].name);
      setSurname(currentUser[0].surname);
    } catch(err) {
      console.log('loading');
    }
  }, [props.users, props.user._id])

  function toggleModal() {
    let modals = Array.from(document.getElementsByClassName('toggle-modal'));
    modals.forEach( modal => {
      modal.classList.toggle('details-modal-closed')
    })
  }

  function changeUserDetails(e) {
    e.preventDefault();

    axios.post(`/users/update/${props.user._id}`, {
      name: name,
      surname: surname
    })
    .then( () => {
      toggleModal();
      props.fetchUsers();
    })
    .catch( err => console.log('didnt work'));
  }

  function onImgChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(`/users/backimgupdate/${props.actualUser._id}`, formData, config)
    .then( () => console.log('img changed'))
    .catch( (err) => {
      console.log(err);
    })
  }

  function onImgAdd(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(`/users/galleryimg/${props.actualUser._id}`, formData, config)
    .then( () => {
      console.log('img changed')
      props.fetchUsers();
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  function addImg(e) {
    e.preventDefault();
    document.getElementById(e.target.name).click();
  }

  return (
    <div className='section-container text-center'>
      <p className='edit-text-p'>change user data</p>
      <button type='button' onClick={toggleModal} className='btn btn-info w-100'>change details</button>
      <div>
        <input type='file' id='background-img' onChange={onImgChange} className='display-none'/>
        <button type='button' name='background-img' onClick={addImg} className='btn btn-info w-100'>change background image</button>
      </div>
      <div>
        <input type='file' id='add-img' onChange={onImgAdd} className='display-none'/>
        <button type='button' name='add-img' onClick={addImg} className='btn btn-info w-100'>add image to gallery</button>
      </div>

      <div>
        <div className='details-modal details-modal-closed toggle-modal' onClick={toggleModal}>
        </div>
        <div className='toggle-modal details-modal-closed content-div'>
          <div className='details-modal-content' onClick={e => e.stopPropagation()}>
            <form onSubmit={changeUserDetails}>
              <input type='text' value={name} onChange={e => setName(e.target.value)}/>
              <input type='text' value={surname} onChange={e => setSurname(e.target.value)}/>
              <button className='btn btn-info'>accept</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users,
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, { fetchUsers })(EditDetails);
