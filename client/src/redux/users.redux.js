import axios from "axios";
import { AUTH } from "../../config";

const reducerName = 'user';
const createActionName = name => `${reducerName}/${name}`;

const LOAD_USERS = createActionName('LOAD_USERS');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// export const startRequest = payload => ({ payload, type: START_REQUEST });
export const loadUsers = payload => ({ payload, type: LOAD_USERS });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadUsersRequest = () => {
  return async dispatch => {

    // dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      let res = await axios.get(`${AUTH}`);
      dispatch(loadUsers(res.data));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};


export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOAD_USERS: 
    return { ...statePart, data: [...action.payload] };
      case ERROR_REQUEST:
      return { ...statePart, error: action.payload.error };
    default:
      return statePart;
  }
}