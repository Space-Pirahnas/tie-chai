package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type user_interest struct {
	Email string
	Interests []string
}

func handleInterest (w http.ResponseWriter, req *http.Request) {
	var ui user_interest;
	decoder := json.NewDecoder(req.Body);
	decoder.Decode(&ui);
	defer req.Body.Close();
	var u Users;
	db.Where(&Users{Email: ui.Email}).First(&u);
	if req.Method == http.MethodPost {
		for _, v := range ui.Interests {
			var i Interests;
			db.Where(&Interests{Name: v}).First(&i);
			db.Create(&User_Interests{User_ID: u.ID, Interest_ID: i.ID});
		}
		w.Header().Set("Content-Type", "application/json");
		r, _ := json.Marshal("updated interests");
		log.Println("saved users interests");
		w.Write(r);
	}
}