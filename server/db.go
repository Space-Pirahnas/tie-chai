package main;

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Users struct {
	gorm.Model
	Name, Email string
	Password []byte
	CityID uint `gorm:"ForeignKey:Cities.ID"`
	ImageID uint `gorm:"ForeignKey:Images.ID"`
	// Cities Cities
	// Image Image
	// Interests []UserInterest
}

type Cities struct {
	gorm.Model
	City_Name string
}

type Event struct {
	gorm.Model
	// Users Users
	UserID uint
	Location, Date, Time, Description string
}

type Image struct {
	gorm.Model
	ImageUrl string
}

type UserInterest struct {
	gorm.Model
	// Users Users
	// Interests Interest
	UserID uint `gorm:"ForeignKey:Users.ID"`
	InterestID uint `gorm:"ForeignKey:Interests.ID`
}

type Interest struct {
	gorm.Model
	Interest_Name string
}

