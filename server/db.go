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
}

type Cities struct {
	ID uint
	City_Name string
}

type Event struct {
	ID uint
	UserID uint 
	Location string `sql:"index:event_idx;not null"`
	Date string `sql:"index:event_idx;not null"`
	Time string `sql:"index:event_idx;not null"`
	Description string `sql:"index:event_idx;not null"`
}

type Image struct {
	ID uint 
	ImageUrl string
}

type UserInterest struct {
	UserID uint `gorm:"ForeignKey:UsersID"`
	InterestID uint `gorm:"ForeignKey:InterestsID`
}

type Interest struct {
	ID uint
	Interest_Name string 
}

type UserFriend struct {
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