package main;

import (
	"encoding/json"
	"net/http"
	"log"
)

type tokenResponse struct {
	Profile string
}

func (u User) storeToken (tokenString string) {
	conn, err := client.Get();
	if err != nil {
		log.Println("error connecting to db");
	}
	defer client.Put(conn);
	res := u.getUser();
	r, _ := json.Marshal(res);
	conn.Cmd("HSET", u.Email, "Token", tokenString);
	conn.Cmd("HSET", u.Email , "Profile", string(r));
}

func handleToken (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		conn, err := client.Get();
		if err != nil {
			log.Println("error connecting to db");
		}
		defer client.Put(conn);
		token := req.Header.Get("Token");
		email := req.Header.Get("Email");
		UserProfile, e := conn.Cmd("HGET", email, "Profile").Str();
		Token, er := conn.Cmd("HGET", email, "Token").Str();
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