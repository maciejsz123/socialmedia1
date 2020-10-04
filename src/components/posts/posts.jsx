import React, { useState, useEffect } from 'react';
import Post from './post';
import ActualUser from '../users/actualUser';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import { fetchUsers } from '../../actions/usersActions';
import axios from 'axios';
import './posts.sass';

function Posts(props) {
  const { fetchPosts, fetchUsers } = props;
  const [text, setText] = useState('');

  useEffect( () => {
    fetchPosts();
    fetchUsers();
  }, [fetchPosts, fetchUsers])

  function addPost(e) {
    e.preventDefault();
    axios.post('/posts/add', {
      userId: props.actualUser._id,
      userName: props.actualUser.name,
      userSurname: props.actualUser.surname,
      text: text,
      likes: 0,
      likesArray: []
    })
    .then( () => {
      setText('')
      fetchPosts();
    })
    .catch( err => {
      console.log(err);
    })
  }

  return (
    <div className='container grid-template'>
      <div className='row'>
        <div className='col-12 order-md-2 col-md-4 d-flex justify-content-center'>
          <div className='actual-user-container'>
            <ActualUser />
          </div>
        </div>
        <div className='posts-container col-12 order-md-1 col-md-8'>
          <form onSubmit={addPost}>
            <input type='text' placeholder='write a message' value={text} onChange={ (e) => setText(e.target.value)}/>
            <button>add post</button>
          </form>
          {props.posts.map( (post) => (
            <Post key={post._id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, { fetchPosts, fetchUsers })(Posts);
