import { combineReducers } from 'redux';
import users from './getUsersReducer';
import posts from './getPostsReducer';

export default combineReducers({
  users: users,
  posts: posts
});
