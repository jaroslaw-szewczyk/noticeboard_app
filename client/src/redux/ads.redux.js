import axios from "axios";
import { API_ADS } from "../../config";

const reducerName = 'ads';
const createActionName = name => `${reducerName}/${name}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// export const startRequest = payload => ({ payload, type: START_REQUEST });
export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadAdsRequest = () => {
  return async dispatch => {

    // dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      let res = await axios.get(`${API_ADS}`);
      dispatch(loadAds(res.data));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};


export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOAD_ADS: 
    return { ...statePart, data: [...action.payload] };
      case ERROR_REQUEST:
      return { ...statePart, error: action.payload.error };
    default:
      return statePart;
  }
}