import axios from "axios";
import { API_URL } from "../../config";

const createActionName = name => `app/users/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOAD_USER = createActionName('LOAD_USER');
const LOG_OUT = createActionName('LOAD_USER');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const logIn = payload => ({
  payload,
  type: LOG_IN
});

export const loadUser = payload => ({
  payload,
  type: LOAD_USER
});

export const logOut = () => ({
  type: LOG_OUT
});

export const errorRequest = payload => ({ 
  payload, 
  type: ERROR_REQUEST 
});

export const loadUserRequest = () => {
  return async dispatch => {
    try {
     const options = {
        method: 'GET',
        credentials: 'include'
      };

      let res = await axios.get(`${API_URL}/auth/user`, options);
      dispatch(loadUser(res.data));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
}

const usersReducer = (statePart = null, action ) => {
  switch(action.type) {
    case LOG_IN:
      return action.payload;
    case LOAD_USER:
      return { ...action.payload };
    case LOG_OUT:
      return null;
    case ERROR_REQUEST:
      return { ...statePart, error: action.payload.error };
    default:
      return statePart;
  }
};

export default usersReducer;