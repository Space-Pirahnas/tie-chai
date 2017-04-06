package main;

import (
	"encoding/json"
	"net/http"
)

type tokenResponse struct {
	Profile string
	Found bool
}

func storeToken (tokenString string, u user) {
	var user Users;
	var image Image;
	db.Where(&Users{Email: u.Email}).First(&user);
	db.Where(&Image{ID: user.ImageID}).First(&image);
	u.Image = image.ImageUrl;
	u.Password = "";
	r, _ := json.Marshal(u);
	client.Cmd("HSET", tokenString, "Profile", string(r));
	client.Cmd("HSET", tokenString, "Email", u.Email);
}

func handleToken (w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		token := req.Header.Get("Token");
		email := req.Header.Get("Email");
		UserProfile, e := client.Cmd("HGET", token, "Profile").Str();
		Email, er := client.Cmd("HGET", token, "Email").Str();
		if e != nil || er != nil {
			http.Error(w, "unable to access cache", http.StatusNotFound);
		}
		res := tokenResponse{ UserProfile, Email == email};
		r, _ := json.Marshal(res);
		w.Write(r);
	}
}