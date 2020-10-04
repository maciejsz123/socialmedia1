import { FETCH_USERS_BEGGINING,
  FETCH_USERS_RECEIVED,
  FETCH_USERS_ERROR,
  SET_ACTUAL_USER
} from '../actions/types';

const initialState = {
  users: [],
  pending: false,
  actualUser: { }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGGINING:
      return {
        ...state,
        pending: true
      }
    case FETCH_USERS_RECEIVED:
      return {
        ...state,
        pending: false,
        users: action.payload
      }
    case FETCH_USERS_ERROR:
      return {
        ...state,
        pending: false,
        users: action.payload
      }
    case SET_ACTUAL_USER:
      return {
        ...state,
        actualUser: action.payload
      }
    default:
      return state;
  }
}
