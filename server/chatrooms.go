package main;

import (
	"log"
	"net/http"
	"encoding/json"
)

type userRoom struct {
	FirstId int
	SecondId int
	RoomNumber float64
}

type chatResponse struct {
	User UserResponse
	Other UserResponse
	ChatRoom float64
}

func handleChatroom(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodPost {
		var ur userRoom;
		defer req.Body.Close();
		err := json.NewDecoder(req.Body).Decode(&ur);
		log.Println(ur);		
		if err != nil {
			log.Println("error decoding request");
		} else {
			var firstChat ChatRoom;
			var secondChat ChatRoom;
			db.Where(&ChatRoom{FirstId: uint(ur.FirstId), SecondId: uint(ur.SecondId), RoomNumber: ur.RoomNumber}).First(&firstChat);
			db.Where(&ChatRoom{FirstId: uint(ur.SecondId), SecondId: uint(ur.FirstId), RoomNumber: ur.RoomNumber}).First(&secondChat);
			if firstChat.RoomNumber != ur.RoomNumber {
				db.Create(&ChatRoom{FirstId: uint(ur.FirstId), SecondId: uint(ur.SecondId), RoomNumber: ur.RoomNumber });
			}
			if secondChat.RoomNumber != ur.RoomNumber {
				db.Create(&ChatRoom{FirstId: uint(ur.SecondId), SecondId: uint(ur.FirstId), RoomNumber: ur.RoomNumber });
			}
			successRequest(w, "created room", "created room");
		}
	} else if req.Method == http.MethodGet {
		var chats []ChatRoom;
		var chatresponses []chatResponse;
		var u User;
		email := req.Header.Get("Email");
		db.Where(&User{Email: email}).First(&u);
		if u.Email == email {
			ur := u.getUser();
			db.Where(&ChatRoom{FirstId: u.ID}).Find(&chats);
			if len(chats) > 0 {
				for _, c := range chats {
					var t User;
					db.Where(&User{ID: c.SecondId}).First(&t);
					chatresp := chatResponse{
						ur,
						t.getUser(),
						c.RoomNumber,
					}
					chatresponses = append(chatresponses, chatresp);
				}
			}
			r, _ := json.Marshal(chatresponses);
			w.Write(r);
		}
	}
}