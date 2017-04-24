package main

import (
	"fmt"
	"net/http"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/mediocregopher/radix.v2/pool"
)

var db *gorm.DB
var err, e error
var client *pool.Pool

func seedTables() {
	for _, v := range interests {
		db.Create(&Interest{Interest_Name: v})
	}
	for _, i := range cities {
		db.Create(&Cities{City_Name: i})
	}
}

func init() {
	config := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=%s", dbConfig.DB_HOST, dbConfig.DB_USER, dbConfig.DB_NAME, dbConfig.DB_SSL)
	db, err = gorm.Open(dbConfig.DB_TYPE, config)
	client, e = pool.New("tcp", "localhost:6379", 10)
	if err != nil || e != nil {
		fmt.Println("error here", err, e)
		panic("can not connect to db");
	}
	db.AutoMigrate(&User{}, &Cities{}, &Event{}, &Interest{}, &UserInterest{}, &Image{}, &UserFriend{}, &Review{}, &UserSave{}, &EventAttendee{}, &EventComment{}, &ChatRoom{})
	//	seedTables();
}

func Serving(port string) {
	fmt.Println("Serving on Port " + port)
}

func SetHeader(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json, multipart/form-data")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Token, Email, City, Keyword, Location, Key, User, Target")
		h(w, req)
	}
}

func main() {
	port := ":8080"
	defer db.Close()
	Serving(port)
	http.HandleFunc("/api/signup", SetHeader(signUp))
	http.HandleFunc("/api/login", SetHeader(logIn))
	http.HandleFunc("/api/create_event", SetHeader(handleEvent))
	http.HandleFunc("/api/interests", SetHeader(handleInterest))
	http.HandleFunc("/api/images", SetHeader(handleImage))
	http.HandleFunc("/api/users", SetHeader(handleUsers))
	http.HandleFunc("/api/friends", SetHeader(handleFriends))
	http.HandleFunc("/api/cities", SetHeader(handleCities))
	http.HandleFunc("/api/token", SetHeader(handleToken))
	http.HandleFunc("/api/reviews", SetHeader(handleReviews))
	http.HandleFunc("/api/reject", SetHeader(handleRejects))
	http.HandleFunc("/api/save", SetHeader(handleSave))
	http.HandleFunc("/api/upload_image", SetHeader(handleUpload))
	http.HandleFunc("/api/target", SetHeader(handleTarget))
	http.HandleFunc("/api/target_event", SetHeader(handleTargetEvent))
	http.HandleFunc("/api/yelp", SetHeader(handleYelp))
	http.HandleFunc("/api/verify", SetHeader(handleVerification))
	http.HandleFunc("/api/rsvp", SetHeader(handleRSVP))
	http.HandleFunc("/api/comment", SetHeader(handleComment))
	http.HandleFunc("/api/notification", SetHeader(handleNotification))
	http.HandleFunc("/api/chatroom", SetHeader(handleChatroom))
	http.ListenAndServe(port, nil)
}
