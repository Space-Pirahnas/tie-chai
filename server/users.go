package main;

import (
	"net/http"
)

func handleUsers(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		city := req.URL.Query()["City"][0];
		var cityId Cities;
		var users []Users;
		db.Where(&Cities{City_Name : city}).First(&cityId);
		db.Where(&Users{CityID: cityId.ID}).Find(&users);
		for _, v := range users {
			var interests []UserInterest;
			db.Where(&UserInterest{UserID: v.ID}).Find(&interests);
			for _, w := range interests {
				var names []Interest;
				db.Where("id = ?", w.ID).Find(&names);
			}
		}
	}
}