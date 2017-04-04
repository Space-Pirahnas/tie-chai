package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type user_interest struct {
	Email string
	Interest []string
}

func initializeInterests(id uint, interest []string) {
	var i Interest;
	for _, v := range interest {
		db.Where(&Interest{Interest_Name: v}).First(&i);
		db.Create(&UserInterest{UserID: id, InterestID : i.ID });
	}
	log.Println("initialized interests table");
}

func handleInterest (w http.ResponseWriter, req *http.Request) {
	var ui user_interest;
	var u Users;
	var i Interest;
	defer req.Body.Close();
	json.NewDecoder(req.Body).Decode(&ui);
	db.Where(&Users{Email: ui.Email}).First(&u);
	if req.Method == http.MethodPut {
		updateInterests(ui, u, i);
		successRequest(w, "updated interests", "saved users interests");
	}
}

func updateInterests(ui user_interest, u Users, i Interest) {
	db.Where("User_ID = ?", u.ID).Unscoped().Delete(&UserInterest{});
	for _, v := range ui.Interest {
		db.Where(&Interest{Interest_Name: v}).First(&i);
		db.Create(&UserInterest{UserID: u.ID, InterestID: i.ID});
	}
}