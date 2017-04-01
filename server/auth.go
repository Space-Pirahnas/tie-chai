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
	Username, Name, Password, Email string
}

type hashedUser struct {
	Username, Name, Email string
	Password []byte
}

var testDb = map[string]hashedUser{};

func signUp (w http.ResponseWriter, req *http.Request) {
	var u user;
	if req.Method == http.MethodPost {
		fu, found := testDb[u.Username];
		if found {
			log.Fatalln("username already taken");
		} else {
			decoder := json.NewDecoder(req.Body);
			err := decoder.Decode(&u);
			defer req.Body.Close();
			if err != nil { log.Println("user structure incorrect"); }
			bp, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.MinCost);
			if err != nil { log.Println("hashing failed"); }
			testDb[u.Username] = hashedUser{ u.Username, u.Name, u.Email, bp, }
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
		fu, found := testDb[u.Username];
		if found {
			er := bcrypt.CompareHashAndPassword(fu.Password, []byte(u.Password));
			if er != nil {
				log.Println("password is incorrect");
			} else {
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"Username": u.Username,
					"Time": time.Now(),
				});
				tokenString, _ := token.SignedString(secret);
				w.Header().Set("Content-Type", "application/json");	
				r, _ := json.Marshal(tokenString);
				log.Println("successfully logged in");
				w.Write(r);
			}
		} else {
			log.Println("user not found in db, please signup");
		}
	} else {
		log.Println("post method required");
	}
}