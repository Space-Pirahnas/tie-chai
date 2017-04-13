import { GET_YELP_BUSINESS } from './types.jsx';
import { axiosInstance } from './index.jsx';
import { YELP_TOKEN } from '../config.js';

export function getYelpBusiness(keyword, location) {
  return function (dispatch) {
    if (!keyword) {
      keyword = 'Cafe'
    }
    if (!location) {
      location = 'San Francisco, CA'
    }
    if (keyword.split(' ').length > 1) {
      keyword = keyword.split(' ').join('-');
    }
    axiosInstance.get('/api/yelp', {
      headers: {
        Keyword: keyword,
        Location: location
      }
    }).then(res => {
      dispatch({ type: GET_YELP_BUSINESS, payload: res.data.businesses });
    }).catch(err => {
      console.error('Fail to get data from server api/yelp with error ', err);
    })
  }

}


