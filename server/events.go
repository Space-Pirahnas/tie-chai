package main;

import (
	"net/http"
	"log"
	"encoding/json"
)

type event struct {
	Email, Location, Date, Time, Description string
}

type update struct {
	Old event
	New event
}

func handleEvent(w http.ResponseWriter, req *http.Request) {
	var users Users;
	var e event;
	if req.Method != http.MethodGet && req.Method != http.MethodPut {
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
	} else if req.Method == http.MethodGet {
			getEvents(users, e, w);
	} else {
		var u update;
		json.NewDecoder(req.Body).Decode(&u);
		db.Where(&Users{ Email: u.Old.Email }).First(&users);
		updateEvent(users, u);
		successRequest(w, "updated event", "sucessfully updated event");
	}
}

func postEvent(users Users, e event) {
	db.Create(&Event{UsersID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description });
}

func deleteEvent(users Users, e event) {
	var ev Event;
	db.Where(&Event{UsersID: users.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description }).First(&ev);
	if ev.UsersID > 0 {
		db.Delete(&ev);
	}
}

func getEvents(users Users, e event, w http.ResponseWriter) {
	var events []Event;
	db.Where(&Event{}).Find(&events);
	// w.Header().Set("Content-Type", "application/json");
	r, _ := json.Marshal(events);
	w.Write(r);
}

func updateEvent(users Users, u update) {
	var ev Event;
	db.Where(&Event{UsersID: users.ID, Location: u.Old.Location, Date: u.Old.Date, Time: u.Old.Time, Description: u.Old.Description }).First(&ev);
	ev.Date = u.New.Date;
	ev.Location = u.New.Location;
	ev.Time = u.New.Time;
	ev.Description = u.New.Description;
	db.Save(&ev);
}