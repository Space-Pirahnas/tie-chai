package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type notification struct {
	Email string
}

func handleNotification (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodPost {
		conn, err := client.Get();
		if err != nil {
			log.Println("error connecting to db");
		}
		defer client.Put(conn);
		defer req.Body.Close();
		var n notification;
		e := json.NewDecoder(req.Body).Decode(&n);
		if e != nil {
			badRequest(w, "could not decode", 400);
		} else {
			var u User;
			db.Where(&User{Email: n.Email}).First(&u);
			if u.Email == n.Email {
				u.NewFriends = 0;
				db.Save(&u);
				res := u.getUser();
				r, _ := json.Marshal(res);
				conn.Cmd("HSET", u.Email , "Profile", string(r));
				successRequest(w, "successfully reset notifications", "reset notifications");
			}
		}
	}
}