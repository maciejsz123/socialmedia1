import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if(serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState);
  } catch(err) {
    console.log('error loading localStorage data');
    return undefined;
  }
}

const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch(err) {
    console.log('error occured while saving state');
  }
}

const initialStore = loadState();

let middleware = [thunk];

const store = createStore(rootReducer, initialStore, applyMiddleware(...middleware));
store.subscribe( () => {
  saveState({
    users: store.getState().users
  });
})

export default store;
