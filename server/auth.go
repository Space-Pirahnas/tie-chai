package main;

import (
	"net/http"
	"log"
	"time"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"
)

type usr struct {
	Name string
	Password string
	Email string
	City string
	Image string
	Profession string
	Company string
	Interests []string
	Bio string
	State string
	Verified string
	NewFriends int
}

func signUp(w http.ResponseWriter, req *http.Request) {
	defer req.Body.Close();
	var u usr;
	var user User;
	var city Cities;
	var id User;
	err := json.NewDecoder(req.Body).Decode(&u);
	if err != nil { log.Println("user structure incorrect"); }
	if req.Method == http.MethodPost {
		db.Where(&User{ Email: u.Email }).First(&user);
		if len(user.Email) > 0 {
			badRequest(w, "Email already taken", http.StatusBadRequest);
		} else {
			bp, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.MinCost);
			if err != nil { log.Println("hashing failed"); }
			db.Where(&Cities{ City_Name: u.City }).First(&city);
			db.Create(&User{Name: u.Name, Email: u.Email, Password: bp, CitiesID: city.ID, Profession: u.Profession, Company: u.Company, Bio: u.Bio, State: u.State, Verified: "false", NewFriends: 0 });
			db.Where(&User{ Email: u.Email}).First(&id);
			go u.sendVerificationEmail();
			go initializeInterests(id.ID, u.Interests);
			id.sendToken(w, secret);
		}
	} else if req.Method != http.MethodOptions {
		log.Println("cannot send a get request");
	} 
}

func logIn(w http.ResponseWriter, req *http.Request) {
	defer req.Body.Close();
	var u usr;
	var user User;
	if req.Method == http.MethodPost {
		err := json.NewDecoder(req.Body).Decode(&u);
		if err != nil { log.Println("user structure incorrect"); }
		db.Where(&User{ Email: u.Email }).First(&user);	
		if len(user.Email) > 0 {
			er := bcrypt.CompareHashAndPassword(user.Password, []byte(u.Password));
			if er != nil {
				badRequest(w, "password is incorrect", http.StatusBadRequest);
			} else {
				user.sendToken(w, secret);
			}
		} else {
			badRequest(w, "user not found in db, please signup", http.StatusFound);
		}
	} else if req.Method != http.MethodOptions {
		log.Println("post method required");
	} 
}

func (u User) sendToken(w http.ResponseWriter, secret []byte){
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Email": u.Email,
		"Time": time.Now(),
	});
	tokenString, _ := token.SignedString(secret);
	u.storeToken(tokenString);
	successRequest(w, tokenString, "successfully logged in");
}