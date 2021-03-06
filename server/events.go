package main;

import (
	"net/http"
	"log"
	"encoding/json"
	"github.com/satori/go.uuid"
)

type event struct {
	Name, Email, Business, Location, Date, Original_Date , Title, Description, Image, Owner, Key, Rating string
	Attendees []UserResponse
	Comments []eventResponse
}

type eventResponse struct {
	Comment EventComment
	User UserResponse
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
			user.postEvent(e);
			successRequest(w, "added event", "added event");
		} else if req.Method == http.MethodDelete {
			user.deleteEvent(e);
			successRequest(w, "removed event successfully", "deleted event");
		} else if req.Method != http.MethodOptions {
			log.Println("request method not supported");
		}
	} else if req.Method == http.MethodGet {
			email := req.Header.Get("Email");
			if len(email) > 0 {
				db.Where(&User{Email: email}).First(&user);
				events := user.getEvents(e);
				r, _ := json.Marshal(events);
				w.Write(r);
			} else {
				badRequest(w, "email not found", 400)
			}
	} else {
		var u update;
		json.NewDecoder(req.Body).Decode(&u);
		db.Where(&User{ Email: u.Old.Email }).First(&user);
		user.updateEvent(u);
		successRequest(w, "updated event", "sucessfully updated event");
	}
}

func (u User) postEvent(e event) {
	uid := uuid.NewV1().String();
	db.Create(&Event{UserID: u.ID, Business: e.Name, Location: e.Location, Date: e.Date, Original_Date: e.Original_Date, Title: e.Title, Description: e.Description, Image: e.Image, Owner: u.Name, Key: uid, Rating: e.Rating});
}

func (u User) deleteEvent(e event) {
	var ev Event;
	var rsvps []EventAttendee;
	var comments []EventComment;
	db.Where(&Event{UserID: u.ID, Business: e.Name, Location: e.Location, Date: e.Date, Original_Date: e.Original_Date, Title: e.Title, Description: e.Description, Image: e.Image, Owner: u.Name, Key: e.Key, Rating: e.Rating }).First(&ev);
	db.Where(&EventAttendee{EventID: ev.ID}).Find(&rsvps);
	db.Where(&EventComment{EventID: ev.ID}).Find(&comments);
	if ev.UserID > 0 {
		db.Delete(&ev);
	}
	for _, v := range rsvps {
		if v.EventID == ev.ID {
			db.Delete(&v);
		}
	}

	for _, c := range comments {
		if c.EventID == ev.ID {
			db.Delete(&c);
		}
	}
}

func (u User) getEvents(e event) []event {
	var events []event;
	var userEvents []event;
	if u.ID > 0 {
		friends := u.findFriends();
		for _, f := range friends {
			var evt []Event;
			var res []event;
			var user User;
			db.Where(&User{Email: f.Email}).First(&user);
			if user.ID > 0 {
				db.Where(&Event{UserID: user.ID}).Find(&evt);
				for _, e := range evt {
					ev := event{
						f.Name,
						f.Email,
						e.Business,
						e.Location,
						e.Date,
						e.Original_Date,
						e.Title,
						e.Description,
						e.Image,
						e.Owner,
						e.Key,
						e.Rating,
						e.getRSVPList(),
						e.getEventComments(),
					}
					res = append(res, ev);
				}
				events = append(events, res...);
			}
		}
	 db.Where(&Event{UserID: u.ID}).Find(&userEvents);
	 if len(userEvents) > 0 {
		 events = append(userEvents, events...);
	 }
	} 
	return sortEvents(events);
}

func (user User) updateEvent(u update) {
	var ev Event;
	db.Where(&Event{UserID: user.ID, Business: u.Old.Business, Location: u.Old.Location, Date: u.Old.Date, Original_Date: u.Old.Original_Date, Title: u.Old.Title, Description: u.Old.Description, Image: u.Old.Image, Owner: u.Old.Owner, Key: u.Old.Key, Rating: u.Old.Rating }).First(&ev);
	ev.Business = u.New.Business;
	ev.Title = u.New.Title;
	ev.Date = u.New.Date;
	ev.Location = u.New.Location;
	ev.Original_Date = u.New.Original_Date;
	ev.Description = u.New.Description;
	ev.Image = u.New.Image;
	ev.Rating = u.New.Rating;
	db.Save(&ev);
}

