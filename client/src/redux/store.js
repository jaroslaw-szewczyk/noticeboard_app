import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

// import reducers
import ads from './ads.redux';
// import users from './users.redux';

// combine reducers
const rootReducer = combineReducers({
  ads,
  // users,
});

const store = createStore(
  rootReducer,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
