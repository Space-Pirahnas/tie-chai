package main;

import (
	"log"
	"net/http"
	"encoding/json"
)

func handleVerification(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		conn, err := client.Get();
		if err != nil {
			log.Println("error connecting to db");
		}
		defer client.Put(conn);
		var u User;
		email := req.URL.Query();
		if len(email["Email"]) > 0 {
			e := email["Email"][0];
			db.Where(&User{Email: e}).First(&u);
			if u.Email == e {
				u.Verified = "true";
				db.Save(&u);
				res := u.getUser();
				r, _ := json.Marshal(res);
				conn.Cmd("HSET", u.Email , "Profile", string(r));
			}
			successRequest(w, "verified user email", "verified user email");
		} else {
			badRequest(w, "no email provided", 400);
		}
	} else if req.Method == http.MethodPost {
		var u usr;
		json.NewDecoder(req.Body).Decode(&u);
		if len(u.Email) > 0 {
			u.sendVerificationEmail();
		} else {
			badRequest(w, "could not read email", 400);
		}
	}
}