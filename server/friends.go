package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type FriendRequest struct {
	User, Friend usr
}

func handleFriends( w http.ResponseWriter, req *http.Request ) {
	if req.Method == http.MethodGet {
		getFriends(w, req);
	} else if req.Method != http.MethodOptions {
		defer req.Body.Close();
		var fr FriendRequest;
		var u, f User;
		e := json.NewDecoder(req.Body).Decode(&fr);
		if e != nil {
			badRequest(w, "unable to decode request", 400);
		} else {
			db.Where(&User{Email: fr.User.Email}).First(&u);
			db.Where(&User{Email: fr.Friend.Email}).First(&f);
			if req.Method == http.MethodPost {
				if u.checkMatch(f) {
					u.addFriend(f);
					u.sendEmailsToMatch(f);
					f.sendEmailsToMatch(u);
					u.newFriend();
					f.newFriend();
					successRequest(w, "successfully added friend", "added friend");
				} else {
					badRequest(w, "match not found, placed in cache", 200);
				}
			} else if req.Method == http.MethodDelete {
				u.deleteFriend(f);
				successRequest(w, "successfully removed friend", "deletedfriend");
			}
		}
	} 
}

func getFriends(w http.ResponseWriter, req *http.Request) {
	var user User;
	email := req.Header.Get("Email");
	db.Where(&User{Email: email}).First(&user);
	if email == user.Email {
		fr := user.findFriends();
		r, _ := json.Marshal(fr);
		log.Println("successfully retrieved friends")
		w.Write(r);		
	} else {
		badRequest(w, "user email not found", http.StatusBadRequest);
	}
}

func (u User) findFriends() []UserResponse {
	var fID []UserFriend;
	var FriendResponses []UserResponse;
	db.Where(&UserFriend{UserID: u.ID}).Find(&fID);
	for _, uf := range fID {
		var friend User;
		if uf.UserID > 0 {
			db.Where(&User{ID: uf.FriendID}).First(&friend);
			res := friend.getUser();
			FriendResponses = append(FriendResponses, res);
		}
	}
	return FriendResponses;
}


func (u User) addFriend(f User) {
	db.Create(&UserFriend{UserID: u.ID, FriendID: f.ID});
	db.Create(&UserFriend{UserID: f.ID, FriendID: u.ID});
}

func (u User) deleteFriend(f User) {
	var uf UserFriend;
	db.Where(&UserFriend{UserID: u.ID, FriendID: f.ID}).First(&uf);
	if uf.FriendID > 0 {
		db.Delete(&uf);
	}
}

func (u User) checkMatch(f User) bool {
	match, _ := client.Cmd("HGET", f.Email, u.Email).Str();
	if match == "true" {
		client.Cmd("HDEL", f.Email, u.Email);
		return true;
	} else {
		client.Cmd("HSET", u.Email, f.Email, "true");
		return false;
	}
}

func (u User) filterFriends(users []User) []User {
	var results []User;
	var friends []UserFriend;
	db.Where(&UserFriend{UserID: u.ID}).Find(&friends);
	for _, v := range users {
		exists := false;
		for _, f := range friends {
			if v.ID == f.FriendID {
				exists = true;
			}
		}
		if !exists {
			results = append(results, v);
		}
	}
	return results;
}

func (u User) newFriend() {
	var user User;
	db.Where(&User{Email: u.Email}).First(&user);
	if u.Email == user.Email {
		user.NewFriends = user.NewFriends + 1;
		db.Save(&user);
		res := user.getUser();
		r, _ := json.Marshal(res);
		client.Cmd("HSET", u.Email , "Profile", string(r));
	}
}