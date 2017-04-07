package main;

import (
	"net/http"
	"encoding/json"
)

type RejectRequest struct {
	User, Reject usr
}

func handleRejects( w http.ResponseWriter, req *http.Request ) {
	if req.Method != http.MethodGet{
		defer req.Body.Close();
		var rr RejectRequest;
		var u, r User;
		e := json.NewDecoder(req.Body).Decode(&rr);
		if e != nil {
			badRequest(w, "unable to decode request", 400);
		} else {
			db.Where(&User{Email: rr.User.Email}).First(&u);
			db.Where(&User{Email: rr.Reject.Email}).First(&r);
			if req.Method == http.MethodPost {
				rejectUser(u, r, w);
			}
		}
	}
} 

func rejectUser(u User, r User, w http.ResponseWriter) {
	client.Cmd("HSET", u.Email, r.Email, "false");
	successRequest(w, "rejected user", "rejected user");
}

func checkReject(u User, r User) bool {
	reject, _ := client.Cmd("HGET", u.Email, r.Email).Str();
	if reject == "false" {
		return false;
	} else {
		return true;
	}
}