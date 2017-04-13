import { axiosInstance } from './index.jsx';
import { getTarget } from './matches.jsx';

export function submitReview(user, target, rating, text){
  return function(dispatch) {
    axiosInstance.post('/api/reviews', {
        Email: target,
        Reviewer_Email: user,
        Text: text,
        Rating: rating
      })
      .then(res => {
        dispatch(getTarget(target));
      })
      .catch(err => {
        console.error("could not post review", err);
      });
  }
}

export function deleteReview(user, target, rating, text){
  return function(dispatch) {
    axiosInstance.delete('/api/reviews', { data: {
        Email: target,
        Reviewer_Email: user,
        Text: text,
        Rating: rating
      }
    })
    .then(res => {
      dispatch(getTarget(target));
    })
    .catch(err => {
      console.error("could not delete review", err);
    });
  }
}