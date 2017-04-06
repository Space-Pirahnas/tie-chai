package main;

import (
	"net/http"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB;
var err error;

func seedTables() {
	for _, v := range interests{
		db.Create(&Interest{Interest_Name: v});
	}
	for _, i := range cities{
		db.Create(&Cities{City_Name: i});
	}
}

func init() {
	config := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=%s", dbConfig.DB_HOST, dbConfig.DB_USER, dbConfig.DB_NAME, dbConfig.DB_SSL);
	db, err = gorm.Open(dbConfig.DB_TYPE, config);
	if err != nil {
		panic("can not connect to db");
	}
	db.AutoMigrate(&Users{}, &Cities{}, &Event{}, &Interest{}, &UserInterest{}, &Image{}, &UserFriend{});
	// seedTables();
}

func main() {
	defer db.Close();
	bundle := http.StripPrefix("/bundles/", http.FileServer(http.Dir("../src/bundles/")));
	public := http.FileServer(http.Dir("../public/"));
	http.Handle("/", public);
	http.Handle("/bundles/", bundle);
	http.HandleFunc("/api/signup", SetHeader(signUp));
	http.HandleFunc("/api/login", SetHeader(logIn));
	http.HandleFunc("/api/create_event", SetHeader(handleEvent));
	http.HandleFunc("/api/interests", SetHeader(handleInterest));
	http.HandleFunc("/api/images", SetHeader(handleImage));
	http.HandleFunc("/api/users", SetHeader(handleUsers));
	http.HandleFunc("/api/friends", SetHeader(handleFriends));
	http.Handle("/favicon.ico", http.NotFoundHandler());
	Serving();
	http.ListenAndServe(":8080", nil);
}

func SetHeader(h http.HandlerFunc) http.HandlerFunc {
  return func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*");
		w.Header().Set("Content-Type", "application/json");
    w.Header().Set("Access-Control-Allow-Credentials", "true");
    w.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    h(w, req);
  }
}