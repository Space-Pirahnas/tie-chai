package main;

import (
	"net/http"
	"log"
	"encoding/json"
)

func successRequest(w http.ResponseWriter, res string, message string) {
	// w.Header().Set("Content-Type", "application/json");
	r, _ := json.Marshal(res);
	log.Println(message);
	w.Write(r);
}

func getCity(u Users) string {
	var city Cities;
	db.Where(&Cities{ID: u.CitiesID}).First(&city);
	return city.City_Name;
}

// var test Users;
// var testcity Cities;
// db.Where(&Users{}).First(&test);
// db.Model(&test).Related(&testcity);
// log.Println(testcity);