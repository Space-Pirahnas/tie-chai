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
	for _, v := range interest {
		var i Interest;
		db.Where(&Interest{Interest_Name: v}).Find(&i);
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
	// } else {
		// getInterests(u);
	} else if req.Method == http.MethodGet {
		getInterestsList(w);
	}
}

func updateInterests(ui user_interest, u Users, i Interest) {
	db.Where("user_id = ?", u.ID).Unscoped().Delete(&UserInterest{});
	for _, v := range ui.Interest {
		db.Where(&Interest{Interest_Name: v}).First(&i);
		db.Create(&UserInterest{UserID: u.ID, InterestID: i.ID});
	}
}

func getInterests(u Users) []string {
	var i []UserInterest;
	var ui []string;
	db.Where(&UserInterest{UserID: u.ID}).Find(&i);
	for _ , j := range i {
		var in Interest;
		db.Where(&Interest{ID: j.InterestID}).First(&in);
		ui = append(ui, in.Interest_Name);
	}
	return ui;
}

func getInterestsList(w http.ResponseWriter) {
	var interests []Interest;
	db.Where(&Interest{}).Find(&interests);
	r, _ := json.Marshal(interests);
	w.Write(r);
}