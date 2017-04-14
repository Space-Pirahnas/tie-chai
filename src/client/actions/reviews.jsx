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

export function updateReview(oldReview, newReview){
  return function(dispatch) {
    axiosInstance.put('/api/reviews', {
        Old: oldReview,
        New: newReview
      })
      .then(res => {
        dispatch(getTarget(oldReview.Email));
      })
      .catch(err => {
        console.error("could not update review", err);
      });
  }
}