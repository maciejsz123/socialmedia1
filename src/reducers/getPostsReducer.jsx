import { FETCH_POSTS_BEGGINING,
  FETCH_POSTS_RECEIVED,
  FETCH_POSTS_ERROR
} from '../actions/types';

const initialState = {
  posts: [],
  pending: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_BEGGINING:
      return {
        ...state,
        pending: true
      }
    case FETCH_POSTS_RECEIVED:
      return {
        ...state,
        pending: false,
        posts: action.payload
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        pending: false,
        posts: action.payload
      }
    default:
      return state;
  }
}
