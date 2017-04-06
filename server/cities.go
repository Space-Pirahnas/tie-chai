package main;

import (
	"net/http"
	"encoding/json"
)

func getCity(u Users) string {
	var city Cities;
	db.Where(&Cities{ID: u.CitiesID}).First(&city);
	return city.City_Name;
}

func handleCities(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		var cities []Cities;
		db.Where(&Cities{}).Find(&cities);
		r, _ := json.Marshal(cities);
		w.Write(r);
	}
}