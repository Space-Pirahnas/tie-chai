package main;

import (
	// "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type User struct {
	ID uint `gorm:"PRIMARY_KEY" sql:"AUTO_INCREMENT"`
	Name string
	Email string `sql:"unique;not null"`
	Password []byte
	CitiesID uint
	ImageID uint
	Image Image
	Interests []Interest `gorm:many2many:users_interests;"`
	Events []Event
	Profession string
	Company string
	Bio string
	State string
	Verified string
	NewFriends int
}

type Cities struct {
	ID uint
	City_Name string
}

type Event struct {
	ID int `gorm:"PRIMARY_KEY" sql:"AUTO_INCREMENT"`
	UserID uint
	Business string
	Location string `sql:"index:event_idx;not null"`
	Date string `sql:"index:event_idx;not null"`
	Original_Date string
	Title string `sql:"index:event_idx;not null"`
	Description string `sql:"index:event_idx;not null"`
	Image string 
	Owner string
	Key string
	Rating string
}

type EventAttendee struct {
	ID uint
	EventID int 
	UserID uint `gorm:"ForeignKey:UserID`
}

type EventComment struct {
	ID uint
	EventID int
	Email string
	Subject string
	Text string
	CreatedAt string
}

type Image struct {
	ID uint 
	ImageUrl string
}

type UserInterest struct {
	UserID uint `gorm:"ForeignKey:UserID"`
	InterestID uint `gorm:"ForeignKey:InterestID`
}

type Interest struct {
	ID uint
	Interest_Name string 
}

type UserFriend struct {
	ID uint
	UserID uint `gorm:"ForeignKey:UsersID"`
	FriendID uint `gorm:"ForeignKey:UsersID"`
}

type Review struct {
	ID uint
	UserID uint
	ReviewerID uint
	Rating int 
	Text string
}

type UserSave struct {
	ID uint
	UserID uint `gorm:"ForeignKey:UsersID"`
	SaveID uint `gorm:"ForeignKey:UsersID"`
}

type ChatRoom struct {
	ID uint
	FirstId uint
	SecondId uint
	RoomNumber float64
}