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
	var user User;
	var e event;
	if req.Method != http.MethodGet && req.Method != http.MethodPut {
		json.NewDecoder(req.Body).Decode(&e);
		db.Where(&User{ Email: e.Email }).First(&user);
		if req.Method == http.MethodPost {
			postEvent(user, e);
			successRequest(w, "added event", "added event");
		} else if req.Method == http.MethodDelete {
			deleteEvent(user, e);
			successRequest(w, "removed event successfully", "deleted event");
		} else {
			log.Println("request method not supported");
		}
	} else if req.Method == http.MethodGet {
			getEvents(user, e, w);
	} else {
		var u update;
		json.NewDecoder(req.Body).Decode(&u);
		db.Where(&User{ Email: u.Old.Email }).First(&user);
		updateEvent(user, u);
		successRequest(w, "updated event", "sucessfully updated event");
	}
}

func postEvent(user User, e event) {
	db.Create(&Event{UserID: user.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description });
}

func deleteEvent(user User, e event) {
	var ev Event;
	db.Where(&Event{UserID: user.ID, Location: e.Location, Date: e.Date, Time: e.Time, Description: e.Description }).First(&ev);
	if ev.UserID > 0 {
		db.Delete(&ev);
	}
}

func getEvents(user User, e event, w http.ResponseWriter) {
	var events []event;
	friends := findFriends(user);
	for _, f := range friends {
		var evt []Event;
		var res []event;
		var user User;
		db.Where(&User{Email: f.Email}).First(&user);
		db.Where(&Event{UserID: user.ID}).Find(&evt);
		for _, e := range evt {
			ev := event{
				f.Email,
				e.Location,
				e.Date,
				e.Time,
				e.Description,
			}
			res = append(res, ev);
		}
		events = append(events, res...);
	}
	r, _ := json.Marshal(events);
	w.Write(r);
}

func updateEvent(user User, u update) {
	var ev Event;
	db.Where(&Event{UserID: user.ID, Location: u.Old.Location, Date: u.Old.Date, Time: u.Old.Time, Description: u.Old.Description }).First(&ev);
	ev.Date = u.New.Date;
	ev.Location = u.New.Location;
	ev.Time = u.New.Time;
	ev.Description = u.New.Description;
	db.Save(&ev);
}