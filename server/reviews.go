package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type ReviewResponse struct {
	Reviewer_Name string
	Reviewer_Email string
	Reviewer_City string
	Reviewer_Image string
	Reviewer_Interests []string
	Reviewer_Rating int
}

type review struct {
	Email string
	Reviewer_Email string
	Text string
	Rating int
}

func getReviews(u User) []ReviewResponse {
	var res []ReviewResponse;
	var reviews []Review;
	db.Where(&Review{UserID: u.ID}).Find(&reviews);
	for _, v := range reviews{
		var reviewer User;
		db.Where(&User{ID: v.ReviewerID}).First(&reviewer);
		singleReview := ReviewResponse{
			reviewer.Name,
			reviewer.Email,
			getCity(reviewer),
			getUserImage(reviewer),
			getInterests(reviewer),
			v.Rating,
		}
		res = append(res, singleReview)
	}
	return res;
}

func handleReviews(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet && req.Method != http.MethodPut {
		var rev review;
		defer req.Body.Close();
		err := json.NewDecoder(req.Body).Decode(&rev);
		if err != nil {
			badRequest(w, "could not read request", http.StatusNotFound);
		} else if req.Method == http.MethodPost {
			addReview(rev, w);
		} else if req.Method == http.MethodDelete {
			deleteReview(rev, w)
		}
	} 
}


func addReview(rev review, w http.ResponseWriter) {
	var user, reviewer User;
	db.Where(&User{Email: rev.Email}).First(&user);
	db.Where(&User{Email: rev.Reviewer_Email}).First(&reviewer);
	db.Create(&Review{UserID: user.ID, ReviewerID: reviewer.ID, Rating: rev.Rating, Text: rev.Text});
	successRequest(w, "successfully added review", "added review");
}

func deleteReview(rev review, w http.ResponseWriter) {
	var review Review;
	var user, reviewer User;
	db.Where(&User{Email: rev.Email}).First(&user);
	db.Where(&User{Email: rev.Reviewer_Email}).First(&reviewer);
	db.Where(&Review{UserID: user.ID, ReviewerID: reviewer.ID, Rating: rev.Rating, Text: rev.Text}).First(&review);
	log.Println(review);
	if len(review.Text) > 0 {
		db.Delete(&review);
		successRequest(w, "deleted review", "deleted review");
	} else {
		badRequest(w, "could not find event", 400);
	}
}