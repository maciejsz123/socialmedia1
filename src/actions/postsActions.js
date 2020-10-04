import { FETCH_POSTS_BEGGINING,
  FETCH_POSTS_RECEIVED,
  FETCH_POSTS_ERROR
} from './types';
import axios from 'axios';

export const fetchPosts = () => dispatch => {
  dispatch({type: FETCH_POSTS_BEGGINING});

  axios.get('/posts')
    .then(posts => {
      dispatch({
        type: FETCH_POSTS_RECEIVED,
        payload: posts.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_POSTS_ERROR,
        payload: []
      })
    });
};
