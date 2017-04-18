package main;

import (
	"log"
	"net/http"
	"encoding/json"
)

type rsvp struct {
	Email, Key string
}


func handleRSVP (w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet && req.Method != http.MethodOptions {
		defer req.Body.Close();
		var r rsvp;
		var e Event;
		var u User;
		err := json.NewDecoder(req.Body).Decode(&r);
		if err != nil {
			log.Println("unable to decode request, wrong format");
		} else {
			db.Where(&Event{Key: r.Key}).First(&e);
			db.Where(&User{Email: r.Email}).First(&u);
			if u.Email == r.Email && r.Key == e.Key {
				if req.Method == http.MethodPost {
					var ea EventAttendee;
					db.Where(&EventAttendee{EventID: e.ID, UserID: u.ID}).First(&ea);
					if ea.EventID != e.ID && ea.UserID != u.ID {
						db.Create(&EventAttendee{EventID: e.ID, UserID: u.ID});
						successRequest(w, "added attendee to event", "added attendee to event");
					}
				} else if req.Method == http.MethodDelete {
					var ea EventAttendee;
					db.Where(&EventAttendee{EventID: e.ID, UserID: u.ID}).First(&ea);
					if ea.UserID == u.ID && ea.EventID == e.ID {
						db.Delete(&ea);
						successRequest(w, "removed from list", "removed from rsvp list");
					} else {
						log.Println("event attendee not found");
					}
				}
			} else {
				badRequest(w, "could not find user or event", 400);
			}
		}
	}
}	

func (e Event) getRSVPList() []UserResponse {
	var ea []EventAttendee;
	var users []UserResponse;
	db.Where(EventAttendee{EventID: e.ID}).Find(&ea);
	for _, u := range ea {
		var user User;
		db.Where(&User{ID: u.UserID}).First(&user);
		if user.ID == u.UserID {
			ur := user.getUser();
			users = append(users, ur);
		}
	}
	return users;
}