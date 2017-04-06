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
}


func handleUsers(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		getNearbyUsers(w, req);
	}
}

func getNearbyUsers(w http.ResponseWriter, req *http.Request ) {
	var UserResponses []UserResponse;
	var cityId Cities;
	var users []Users;
	q := req.URL.Query();
	if (len(q["City"]) > 0) {
		city := req.URL.Query()["City"][0];
		db.Where(&Cities{City_Name : city}).First(&cityId);
		db.Where(&Users{CitiesID: cityId.ID}).Find(&users);
		for _, v := range users {
			var res UserResponse;
			res.Interests = getInterests(v);
			res.Name = v.Name;
			res.Email = v.Email;
			res.City = getCity(v);
			res.Image = getUserImage(v);
			UserResponses = append(UserResponses, res);
		}
		r, _ := json.Marshal(UserResponses);
		w.Write(r);
	} else {
		http.Error(w, "bad get request", http.StatusBadRequest);
	}
}

