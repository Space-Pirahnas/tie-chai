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

func initializeInterests(id uint, interests []string) {
	var i Interests;
	for _, v := range interests {
		db.Where(&Interests{Interest_Name: v}).First(&i);
		db.Create(&User_Interests{User_ID: id, Interest_ID : i.ID });
	}
	log.Println("initialized interests table");
}

func handleInterest (w http.ResponseWriter, req *http.Request) {
	var ui user_interest;
	var u Users;
	var i Interests;
	defer req.Body.Close();
	decoder := json.NewDecoder(req.Body);
	decoder.Decode(&ui);
	db.Where(&Users{Email: ui.Email}).First(&u);
	if req.Method == http.MethodPut {
		db.Where("User_ID = ?", u.ID).Unscoped().Delete(&User_Interests{});
		for _, v := range ui.Interests {
			db.Where(&Interests{Interest_Name: v}).First(&i);
			db.Create(&User_Interests{User_ID: u.ID, Interest_ID: i.ID});
		}
		successRequest(w, "updated interests", "saved users interests");
	}
}