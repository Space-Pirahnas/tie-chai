package main;

import (
	"encoding/json"
	"net/http"
	"log"
)

type tokenResponse struct {
	Profile string
}

func storeToken (tokenString string, u usr) {
	var user User;
	db.Where(&User{Email: u.Email}).First(&user);
	if len(user.Email) > 0 {
		res := getUser(user);
		r, _ := json.Marshal(res);
		client.Cmd("HSET", u.Email, "Token", tokenString);
		client.Cmd("HSET", u.Email , "Profile", string(r));
	} else {
		log.Println("user not found");
	}
}

func handleToken (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		token := req.Header.Get("Token");
		email := req.Header.Get("Email");
		UserProfile, e := client.Cmd("HGET", email, "Profile").Str();
		Token, er := client.Cmd("HGET", email, "Token").Str();
		if e != nil || er != nil {
			badRequest(w, "unable to access cache", http.StatusNotFound);
		} else if Token == token {
			res := tokenResponse{ UserProfile };
			r, _ := json.Marshal(res);
			w.Write(r);
		} else {
			badRequest(w, "token did not match user email", 400);
		}
	} 
}