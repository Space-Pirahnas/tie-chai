package main;
import (
	"net/http"
	"log"
	"time"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"
)

type user struct {
	Name, Password, Email, City string
}

func signUp (w http.ResponseWriter, req *http.Request) {
	var u user;
	decoder := json.NewDecoder(req.Body);
	err := decoder.Decode(&u);
	defer req.Body.Close();
	if req.Method == http.MethodPost {
		var users Users;
		db.Where(&Users{ Email: u.Email }).First(&users);
		if len(users.Email) > 0 {
			http.Error(w, "Email already taken", http.StatusBadRequest);
		} else {
			if err != nil { log.Println("user structure incorrect"); }
			bp, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.MinCost);
			if err != nil { log.Println("hashing failed"); }
			var city Cities;
			db.Where(&Cities{ City_Name: u.City }).First(&city);
			db.Create(&Users{Name: u.Name, Email: u.Email, Password: bp, City_ID: city.ID });
			w.Header().Set("Content-Type", "application/json");
			r, _ := json.Marshal("successfully signed up");
			log.Println("successfully signed up user");
			w.Write(r);
		}
	} else {
		log.Println("cannot send a get request");
	}
}

func logIn (w http.ResponseWriter, req *http.Request) {
	var u user;
	if req.Method == http.MethodPost {
		decoder := json.NewDecoder(req.Body);
		err := decoder.Decode(&u);
		defer req.Body.Close();
		if err != nil { log.Println("user structure incorrect"); }
		var users Users;
		db.Where(&Users{ Email: u.Email }).First(&users);	
		if len(users.Email) > 0 {
			er := bcrypt.CompareHashAndPassword(users.Password, []byte(u.Password));
			if er != nil {
				http.Error(w, "password is incorrect", http.StatusBadRequest);
			} else {
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"Email": u.Email,
					"Time": time.Now(),
				});
				tokenString, _ := token.SignedString(secret);
				w.Header().Set("Content-Type", "application/json");	
				r, _ := json.Marshal(tokenString);
				log.Println("successfully logged in");
				w.Write(r);
			}
		} else {
			http.Error(w, "user not found in db, please signup", http.StatusFound);
		}
	} else {
		log.Println("post method required");
	}
}