package main;

import (
	"net/http"
	"encoding/json"
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
}

func handleInterest (w http.ResponseWriter, req *http.Request) {
	var ui user_interest;
	var u User;
	var i Interest;
	defer req.Body.Close();
	json.NewDecoder(req.Body).Decode(&ui);
	db.Where(&User{Email: ui.Email}).First(&u);
	if req.Method == http.MethodPut {
		u.updateInterests(ui, i);
		successRequest(w, "updated interests", "saved users interests");
	} else if req.Method == http.MethodGet {
		interests := getInterestsList();
		r, _ := json.Marshal(interests);
		w.Write(r);
	}
}

func (u User) updateInterests(ui user_interest, i Interest) {
	db.Where("user_id = ?", u.ID).Unscoped().Delete(&UserInterest{});
	for _, v := range ui.Interest {
		db.Where(&Interest{Interest_Name: v}).First(&i);
		db.Create(&UserInterest{UserID: u.ID, InterestID: i.ID});
	}
}

func (u User) getInterests() []string {
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

func getInterestsList() []Interest {
	var interests []Interest;
	db.Where(&Interest{}).Find(&interests);
	return interests;
}