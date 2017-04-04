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
	var users Users;
	var e event;
	if req.Method != http.MethodGet {
		json.NewDecoder(req.Body).Decode(&e);
		db.Where(&Users{ Email: e.Email }).First(&users);
		if req.Method == http.MethodPost {
			postEvent(users, e);
			successRequest(w, "added event", "added event");
		} else if req.Method == http.MethodDelete {
			deleteEvent(users, e);
			successRequest(w, "removed event successfully", "deleted event");
		} else {
			log.Println("request method not supported");
		}
	} else {
			getEvents(users, e, w);
	}
}

func postEvent(users Users, e event) {
	db.Create(&Event{UserID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description });
}

func deleteEvent(users Users, e event) {
	var ev Event;
	db.Where(&Event{UserID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description }).First(&ev);
	db.Unscoped().Delete(&ev);
}

func getEvents(users Users, e event, w http.ResponseWriter) {
	var events []Event;
	db.Where(&Event{}).Find(&events);
	w.Header().Set("Content-Type", "application/json");
	r, _ := json.Marshal(events);
	w.Write(r);
}