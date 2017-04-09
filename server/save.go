package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type SaveRequest struct {
	User, Save usr
}

func handleSave(w http.ResponseWriter, req *http.Request) {
	var u User;
	if req.Method != http.MethodGet && req.Method != http.MethodOptions {
		defer req.Body.Close();
		var sr SaveRequest;
		var s User;
		e := json.NewDecoder(req.Body).Decode(&sr);
		if e != nil {
			badRequest(w, "could not read format", 400);
		} else {
			db.Where(&User{Email: sr.User.Email}).First(&u);
			db.Where(&User{Email: sr.Save.Email}).First(&s);
			if req.Method == http.MethodPost {
				saveUser(u, s, w);
			} else if req.Method == http.MethodDelete {
				deleteSave(u, s, w);
			}
		}
	} else if req.Method == http.MethodGet {
		email := req.Header.Get("Email");
		db.Where(&User{Email: email}).First(&u);
		if u.Email == email {
			getSaves(u, w);
		} else {
			badRequest(w, "could not find user", 400);
		}
	}
}

func saveUser(u User, s User, w http.ResponseWriter ) {
	db.Create(&UserSave{UserID: u.ID, SaveID: s.ID});
	successRequest(w, "successfully save match", "added friend");
}

func getSaves(u User, w http.ResponseWriter) {
	su := findSaves(u);
	r, _ := json.Marshal(su);
	log.Println("successfully retrieved saves")
	w.Write(r);		
}

func findSaves(u User) []UserResponse {
	var sID []UserSave;
	var SaveResponses []UserResponse;
	db.Where(&UserSave{UserID: u.ID}).Find(&sID);
	for _, us := range sID {
		var saveUser User;
		if us.UserID > 0 {
			db.Where(&User{ID: us.SaveID}).First(&saveUser);
			res := getUser(saveUser);
			SaveResponses = append(SaveResponses, res);
		}
	}
	return SaveResponses;
}

func deleteSave(u User, s User, w http.ResponseWriter) {
	var us UserSave;
	db.Where(&UserSave{UserID: u.ID, SaveID: s.ID}).First(&us);
	if us.SaveID == s.ID {
		db.Delete(&us);
		successRequest(w, "user save deleted", "user save deleted");
	} else {
		badRequest(w, "could not find saved user", 400);
	}
}

func filterSaves(u User, users []User) []User {
	var results []User;
	var saves []UserSave;
	db.Where(&UserSave{UserID: u.ID}).Find(&saves);
	for _, v := range users {
		exists := false;
		for _, s := range saves {
			if v.ID == s.SaveID {
				exists = true;
			}
		}
		if !exists {
			results = append(results, v);
		}
	}
	return results;
}