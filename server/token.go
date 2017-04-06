package main;

import (
	"encoding/json"
	"net/http"
)

type tokenResponse struct {
	Profile string
	Match bool
}

func storeToken (tokenString string, u usr) {
	var user User;
	var image Image;
	db.Where(&User{Email: u.Email}).First(&user);
	db.Where(&Image{ID: user.ImageID}).First(&image);
	u.Image = image.ImageUrl;
	u.Password = "";
	r, _ := json.Marshal(u);
	client.Cmd("HSET", u.Email, "Token", tokenString);
	client.Cmd("HSET", u.Email , "Profile", string(r));
}

func handleToken (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		token := req.Header.Get("Token");
		email := req.Header.Get("Email");
		UserProfile, e := client.Cmd("HGET", email, "Profile").Str();
		Token, er := client.Cmd("HGET", email, "Token").Str();
		if e != nil || er != nil {
			http.Error(w, "unable to access cache", http.StatusNotFound);
		}
		res := tokenResponse{ UserProfile, Token == token};
		r, _ := json.Marshal(res);
		w.Write(r);
	}
}