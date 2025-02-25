import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

// combine reducers
const rootReducer = combineReducers({
  ads: adsReducer,
  users: usersReducer
});


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
console.log('Store state:', store.getState());
export default store;
