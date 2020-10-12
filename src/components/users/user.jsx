import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import { fetchUsers } from '../../actions/usersActions';
import UserHeader from './userHeader/userHeader';
import Post from '../posts/post';
import EditDetails from './editDetails';
import ImagesSection from './imagesSection/imagesSection';

function User(props) {
  const { fetchPosts, fetchUsers, users } = props;
  const [user, setUser] = useState(null);

  useEffect( () => {
    const id = window.location.pathname.substring(6);
    axios.get(`/users/${id}`)
    .then( (v) => setUser(v.data))
    .catch( err => console.log(err))
  }, [users])

  useEffect( () => {
    fetchPosts();
    fetchUsers();
  }, [fetchPosts, fetchUsers])

  if(!user) {
    return <div className='container'>user doesn't exist</div>
  }

  const posts = props.posts.filter( post => window.location.pathname.substring(6) === post.userId);

  return (
    <div className='container'>
      <UserHeader user={user}/>
      <div className='d-flex flex-column flex-md-row'>
        <div className='col-12 col-md-4 edit-user order-md-2 m-2 d-flex flex-column align-content-center'>
          {props.actualUser._id === user._id ? <EditDetails user={user}/> : ''}
          <ImagesSection user={user}/>
        </div>
        <div className='col-12 col-md-8 user-posts order-md-1 m-2'>
          {posts.map( post => <Post key={post._id} post={post}/>)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  users: state.users.users,
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, { fetchPosts, fetchUsers })(User);
