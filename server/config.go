package main;

import "os";

var secret = []byte(os.Getenv("TIE_CHIA_TOKEN_SECRET"));

var hostURL string = "http://52.9.55.148:8080/";

type DB_CONFIG struct{
	DB_TYPE, DB_HOST, DB_USER, DB_NAME, DB_SSL string
}

type AWS_CONFIG struct {
	aws_access_key_id, aws_secret_access_key, aws_bucket_name, aws_path, aws_region string
}

type GMAIL_CONFIG struct{
	Email, Password string
}

var YELP_TOKEN string = os.Getenv("YELP_TOKEN");

var dbConfig = DB_CONFIG{
	"postgres",
	"localhost",
	os.Getenv("POSTGRES_USER"),
	os.Getenv("POSTGRES_DB"),
	"disable",
}

var interests = []string{
	"Accounting",
  "Alcohol",
  "Animals",
  "Anime",
  "Art",
  "Back-Scratching",
  "Badminton",
  "Basket Weaving",
  "Basketball",
  "Biking",
  "Billiards/Pool",
  "Boozing",
  "Bowling",
  "Boxing",
  "C#",
  "C++",
  "Camping",
  "Camping",
  "Catholicism",
  "Climbing",
  "Coffee",
  "Collecting",
  "Construction",
  "Consulting",
  "Cooking",
  "Cosplay",
  "Culture",
  "Dancing",
  "Data Science",
  "Databases",
  "Design",
  "Disney",
  "Diving",
  "Drinking",
  "Eating",
  "Elixir",
  "Engineering",
  "English",
  "Environment",
  "Film",
  "Finance",
  "Fishing",
  "Fitness",
  "Flower Picking",
  "Football",
  "Gardening",
  "Geology",
  "Golang",
  "Golf",
  "Harvesting",
  "Haskell",
  "Hiking",
  "Java",
  "JavaScript",
  "Knitting",
  "Liberal Arts",
  "Luging",
  "Manga",
  "Martial Arts",
  "Math",
  "Meat Curation",
  "Medicine",
  "Music",
  "Outdoors",
  "Painting",
  "Philosophy",
  "Photography",
  "Plumbing",
  "Politics",
  "Psychology",
  "Python",
  "Reading",
  "Rock Climbing",
  "Rust",
  "Sculpting",
  "Semiconductors",
  "Singing",
  "Skala",
  "Skiing",
  "Snowboarding",
  "Soccer",
  "Social Studies",
  "Spelunking",
  "Statistics",
  "Surfing",
  "Swimming",
  "TV",
  "Tennis",
  "Traveling",
  "UI/UX",
  "Video Games",
  "Welding",
  "Wilderness",
  "Wrestling",
  "Yoga",
  "Zookeeping", 
}

var cities = []string {
	"Atlanta - GA",
  "San Jose - CA",
  "San Diego - CA",
  "San Francisco - CA",
  "San Mateo - CA",
  "Palo Alto - CA",
  "Boston - MA",
  "Boulder - CO",
  "Charlotte - NC",
  "Chicago - IL",
  "Denver - CO",
  "Detroit - MI",
  "Las Vegas - NV",
  "Los Angeles - CA",
  "Menlo Park - CA",
  "Minneapolis - MN",
  "Mountain View - CA",
  "Nashville - TN",
  "New York City - NY",
  "Philadelphia - PA",
  "Phoenix - AZ",
  "Portland - OR",
  "Salt Lake City - UT",
  "Seattle - WA",
}


var AWS = AWS_CONFIG{
	 os.Getenv("AWS_ACCESS_KEY_ID"),
	 os.Getenv("AWS_SECRET_ACCESS_KEY"),
	 os.Getenv("AWS_BUCKET_NAME"),
	 os.Getenv("AWS_PATH"),
	 os.Getenv("AWS_REGION"),
}

var Gmail = GMAIL_CONFIG{
	os.Getenv("GMAIL_EMAIL"),
	os.Getenv("GMAIL_EMAIL_PASSWORD"),
}
