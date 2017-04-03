package main;

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Users struct {
	gorm.Model
	Name, Email string
	Password []byte
	City_ID uint `gorm:"ForeignKey:Cities.ID"`
	Image_ID uint `gorm:"ForeignKey:Images.ID"`
}

type Cities struct {
	gorm.Model
	City_Name string
}

type Events struct {
	gorm.Model
	User_ID uint `gorm:"ForeignKey:Users.ID"`
	Location, Date, Time, Description string
}

type Images struct {
	gorm.Model
	Url string
}

type User_Interests struct {
	gorm.Model
	User_ID uint `gorm:"ForeignKey:Users.ID"`
	Interest_ID uint `gorm:"ForeignKey:Interests.ID`
}

type Interests struct {
	gorm.Model
	Name string
}

