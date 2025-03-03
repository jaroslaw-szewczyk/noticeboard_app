import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import poprawnego narzędzia
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

// combine reducers
const rootReducer = combineReducers({
  ads: adsReducer,
  users: usersReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Obsługuje DevTools bez błędów
);

export default store;