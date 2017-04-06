package main;

import (
	"net/http"
	"encoding/json"
)

type UserResponse struct {
	Name string
	Email string
	City string
	Image string
	Interests []string
	Reviews []ReviewResponse
}


func handleUsers(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		getNearbyUsers(w, req);
	}
}

func getUser(u User) UserResponse {
	return UserResponse{
		u.Name,
		u.Email,
		getCity(u),
		getUserImage(u),
		getInterests(u),
		getReviews(u),
	}
}

func getNearbyUsers(w http.ResponseWriter, req *http.Request ) {
	var UserResponses []UserResponse;
	var cityId Cities;
	var users []User;
	q := req.URL.Query();
	if (len(q["City"]) > 0) {
		city := req.URL.Query()["City"][0];
		db.Where(&Cities{City_Name : city}).First(&cityId);
		db.Where(&User{CitiesID: cityId.ID}).Find(&users);
		for _, v := range users {
			res := getUser(v);
			UserResponses = append(UserResponses, res);
		}
		r, _ := json.Marshal(UserResponses);
		w.Write(r);
	} else {
		badRequest(w, "bad get request", http.StatusBadRequest);
	}
}
