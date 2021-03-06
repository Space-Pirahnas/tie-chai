package main;

import (
	"net/http"
	"encoding/json"
)

type ReviewResponse struct {
	Reviewer_Name string
	Reviewer_Email string
	Reviewer_City string
	Reviewer_Image string
	Reviewer_Interests []string
	Reviewer_Rating int
	Reviewer_Text string
}

type review struct {
	Email string
	Reviewer_Email string
	Text string
	Rating int
}

type reviewUpdate struct {
	Old, New review
}

func (u User) getReviews() []ReviewResponse {
	var res []ReviewResponse;
	var reviews []Review;
	db.Where(&Review{UserID: u.ID}).Find(&reviews);
	for _, v := range reviews{
		var reviewer User;
		db.Where(&User{ID: v.ReviewerID}).First(&reviewer);
		singleReview := ReviewResponse{
			reviewer.Name,
			reviewer.Email,
			reviewer.getCity(),
			reviewer.getUserImage(),
			reviewer.getInterests(),
			v.Rating,
			v.Text,
		}
		res = append(res, singleReview)
	}
	return res;
}

func handleReviews(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet && req.Method != http.MethodPut && req.Method != http.MethodOptions {
		var rev review;
		defer req.Body.Close();
		err := json.NewDecoder(req.Body).Decode(&rev);
		if err != nil {
			badRequest(w, "could not read request", http.StatusNotFound);
		} else if req.Method == http.MethodPost {
			addReview(rev);
			successRequest(w, "successfully added review", "added review");
		} else if req.Method == http.MethodDelete {
			deleted := deleteReview(rev);
			if deleted {
				successRequest(w, "deleted review", "deleted review");
			} else {
				badRequest(w, "could not find event", 400);
			}
		}
	} else if req.Method == http.MethodPut {
		var update reviewUpdate;
		defer req.Body.Close();
		err := json.NewDecoder(req.Body).Decode(&update);
		if err != nil {
			badRequest(w, "could not read request", http.StatusNotFound);
		} else {
			deleted := deleteReview(update.Old);
			if deleted {
				addReview(update.New);
			}
			successRequest(w, "updated review", "updated review")
		}
	}
}

func addReview(rev review) {
	var user, reviewer User;
	db.Where(&User{Email: rev.Email}).First(&user);
	db.Where(&User{Email: rev.Reviewer_Email}).First(&reviewer);
	db.Create(&Review{UserID: user.ID, ReviewerID: reviewer.ID, Rating: rev.Rating, Text: rev.Text});
}

func deleteReview(rev review) bool {
	var r Review;
	var user, reviewer User;
	db.Where(&User{Email: rev.Email}).First(&user);
	db.Where(&User{Email: rev.Reviewer_Email}).First(&reviewer);
	db.Where(&Review{UserID: user.ID, ReviewerID: reviewer.ID, Rating: rev.Rating, Text: rev.Text}).First(&r);
	if len(r.Text) > 0 {
		db.Delete(&r);
		return true;
	}
	return false;
}

func (u User) getAverageRating() float64 {
	reviews := u.getReviews();
	var rating int;
	for _, r := range reviews {
		rating += r.Reviewer_Rating;
	}

	if len(reviews) != 0 {
		return float64(rating)/float64(len(reviews));
	} else {
		return float64(5);
	}
}
