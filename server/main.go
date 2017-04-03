package main;

import (
	"net/http"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error;

func seedTables() {
	for _, v := range interests{
		db.Create(&Interests{Interest_Name: v});
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
	db.AutoMigrate(&Users{}, &Cities{}, &Events{}, &Interests{}, &User_Interests{}, &Images{});
	// seedTables();
}

func main() {
	defer db.Close();
	bundle := http.StripPrefix("/bundles/", http.FileServer(http.Dir("../src/bundles/")));
	public := http.FileServer(http.Dir("../public/"));
	http.Handle("/", public);
	http.Handle("/bundles/", bundle);
	http.HandleFunc("/api/signup", signUp);
	http.HandleFunc("/api/login", logIn);
	http.HandleFunc("/api/create_event", handleEvent);
	http.HandleFunc("/api/interests", handleInterest);
	http.HandleFunc("/api/images", handleImage)
	http.Handle("/favicon.ico", http.NotFoundHandler());
	Serving();
	http.ListenAndServe(":8080", nil);
}