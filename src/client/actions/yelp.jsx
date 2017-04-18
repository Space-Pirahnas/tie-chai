import { GET_YELP_BUSINESS, SELECTED_YELP_BUSINESS } from './types.jsx';
import { axiosInstance } from './index.jsx';
import { YELP_TOKEN } from '../config.jsx';

export function getYelpBusiness(keyword, location) {
  return function (dispatch) {
    // edge case
    if (!keyword) {
      keyword = 'Cafe'
    }
    if (!location) {
      location = 'San Francisco, CA'
    }

    // change the format, using '-' to join each word
    if (keyword.split(' ').length > 1) {
      keyword = keyword.split(' ').join('-');
    }
    location = location.split(' ').map(el => {
      return el.replace(',', '');
    }).join('-');
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

export function selectedBusiness(business) {
  return function (dispatch) {
    dispatch({ type: SELECTED_YELP_BUSINESS, payload: business });
  }
}



