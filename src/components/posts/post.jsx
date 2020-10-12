import React from 'react';
import axios from 'axios';
import { fetchPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Post(props) {
  const { fetchPosts, post } = props;

  const monthDescription = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(props.post.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const actualYear = new Date().getFullYear();
  const didILiked = props.post.likesArray.find( id => id === props.actualUser._id);
  let name, surname = '';

  let avatar = null;
  try {
    const avatarimg = props.users.find( user => user._id === props.post.userId).avatar;
    avatar = require(`../../uploads/${avatarimg}`);
    name = props.users.find( user => user._id === post.userId).name;
    surname = props.users.find( user => user._id === post.userId).surname;
  } catch(err) {
    console.log('loading file');
  }

  function deletePost(e) {
    e.preventDefault();
    axios.delete(`/posts/${props.post._id}`)
    .then( () => {
      fetchPosts();
    })
  }

  function addLike(e) {
    e.preventDefault();
    axios.get(`/posts/${props.post._id}`)
    .then( resp => {
        const didILiked = resp.data.likesArray.find((v) => v === props.actualUser._id)

        if(didILiked) {
          axios.post(`/posts/update/${props.post._id}`, {
            userId: resp.data.userId,
            text: resp.data.text,
            likes: resp.data.likes - 1,
            likesArray: resp.data.likesArray.filter( v => v !== props.actualUser._id)
          })
          .then( () => {
            fetchPosts();
          })
        } else {
          axios.post(`/posts/update/${props.post._id}`, {
            userId: resp.data.userId,
            text: resp.data.text,
            likes: resp.data.likes + 1,
            likesArray: [...resp.data.likesArray, props.actualUser._id]
          })
          .then( () => {
            fetchPosts();
          })
        }
    })
    .catch( err => {
      console.log(err);
    })
  }

  return (
    <div className='post row'>
      <div className='post-img col-4 col-xl-3 nopadding'>
        <img src={avatar} alt='avatar' className='avatar'/>
      </div>
      <div className='col-8 col-xl-9 row'>
        <div className='row col-12'>
          <div className='post-author col-6'><Link to={`/user/${props.post.userId}`}>{`${name} ${surname}`}</Link></div>
          <div className='post-date col-4'>{day} {monthDescription[month]} {year === actualYear ? '' : year}</div>
          <div className='post-delete col-2'>
          {
            props.post.userId !== props.actualUser._id ? '' : <img src={require('../../imgs/delete.png')} onClick={deletePost} alt='delete' className='icon'/>
          }
          </div>
        </div>
        <div className='post-content col-12'>{props.post.text}</div>
        <div className='post-likes col-12 d-flex align-items-end'>
          {
            didILiked ?
            <img src={require('../../imgs/liked.png')} className='icon' onClick={addLike} alt='like' /> :
            <img src={require('../../imgs/like.png')} className='icon' onClick={addLike} alt='like' />
          }
          <span className='pl-2'>{props.post.likes}</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser,
  users: state.users.users
})

export default connect(mapStateToProps, {fetchPosts})(Post);
