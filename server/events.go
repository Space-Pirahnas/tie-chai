package main;

import (
	"net/http"
	"log"
	"encoding/json"
)

type event struct {
	Email, Location, Date, Time, Description string
}

func handleEvent(w http.ResponseWriter, req *http.Request) {
	var e event;
	decoder := json.NewDecoder(req.Body);
	err := decoder.Decode(&e);
	if err != nil {
		http.Error(w, "error reading request", http.StatusBadRequest);
	}
	var users Users;
	db.Where(&Users{ Email: e.Email }).First(&users);
	if req.Method == http.MethodPost {
		db.Create(&Events{User_ID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description });
		w.Header().Set("Content-Type", "application/json");
		r, _ := json.Marshal("added event successfully");
		log.Println("added event");
		w.Write(r);
	} else if req.Method == http.MethodDelete {
		var ev Events;
		db.Where(&Events{User_ID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description }).First(&ev);
		db.Unscoped().Delete(&ev);
		w.Header().Set("Content-Type", "application/json");
		r, _ := json.Marshal("removed event successfully");
		log.Println("deleted event");	
		w.Write(r);
	} else {
		log.Println("needs to be a post request");
	}
}