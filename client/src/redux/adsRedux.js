import axios from "axios";
import { API_URL } from "../../config";


const createActionName = name => `app/ads/${name}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const getAds = ({ ads }) => ads;

export const loadAds = payload => ({ 
  payload, 
  type: LOAD_ADS 
});

export const errorRequest = payload => ({ 
  payload, 
  type: ERROR_REQUEST 
});

export const loadAdsRequest = () => {
  return async dispatch => {
    try {
      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAds(res.data));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};


const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS: 
    return [...action.payload];
      case ERROR_REQUEST:
      return { ...statePart, error: action.payload.error };
    default:
      return statePart;
  }
};

export default adsReducer;