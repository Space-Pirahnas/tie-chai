package main

var secret = []byte("tie-chai-is-the-best")

type DB_CONFIG struct {
	DB_TYPE, DB_HOST, DB_USER, DB_NAME, DB_SSL string
}

var dbConfig = DB_CONFIG{
	"postgres",
	"localhost",
	"Ryan",
	"tiechai",
	"disable",
}

var interests = []string{
	"Golang",
	"JavaScript",
	"Finance",
	"Accounting",
}

var cities = []string{
	"San Francisco, CA",
	"San Jose, CA",
	"Seattle, WA",
}
