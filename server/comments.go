package main;

import (
	"log"
	"net/http"
	"encoding/json"
)

type comment struct {
	Key string
	Email string
	Subject string
	Text string
	CreatedAt string
}

func handleComment(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet && req.Method != http.MethodOptions {
		defer req.Body.Close();
		var c comment;
		err := json.NewDecoder(req.Body).Decode(&c);
		if err != nil {
			log.Println("wrong format, could not decode post");
		} else {
			var event Event;
			db.Where(&Event{Key: c.Key}).First(&event);
			if req.Method == http.MethodPost {
				db.Create(&EventComment{EventID: event.ID, Email: c.Email, Subject: c.Subject, Text: c.Text, CreatedAt: c.CreatedAt });
				successRequest(w, "successfully added comment", "successfully added comment");
			} else if req.Method == http.MethodDelete {
				var ec EventComment;
				db.Where(&EventComment{EventID: event.ID, Email: c.Email, Subject: c.Subject, Text: c.Text, CreatedAt: c.CreatedAt }).First(&ec);
				if ec.EventID == event.ID {
					db.Delete(&ec);
					successRequest(w, "deleted comment", "deleted comment");
				}
			}
		}
	}
}

func (e Event) getEventComments() []eventResponse {
	var ec []EventComment;
	var res []eventResponse;
	db.Where(&EventComment{EventID: e.ID}).Find(&ec);
	if len(ec) > 0 {
		for _, v := range ec {
			var u User;
			var r eventResponse;
			db.Where(&User{Email: v.Email}).First(&u);
			if u.Email == v.Email {
				r.User = u.getUser();
				r.Comment = v;
			}
			res = append(res, r);
		}
	}
	return res;
}