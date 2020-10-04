import { FETCH_USERS_BEGGINING,
  FETCH_USERS_RECEIVED,
  FETCH_USERS_ERROR,
  SET_ACTUAL_USER
} from './types';
import axios from 'axios';

export const fetchUsers = () => dispatch => {
  dispatch({type: FETCH_USERS_BEGGINING});

  axios.get('/users')
    .then(users => {
      dispatch({
        type: FETCH_USERS_RECEIVED,
        payload: users.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: []
      })
    });
};

export const setActualUser = (user) => dispatch => {
  dispatch({
    type: SET_ACTUAL_USER,
    payload: user
  })
};
