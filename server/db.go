package main;

import (
	// "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Users struct {
	// gorm.Model
	ID uint `gorm:"PRIMARY_KEY" sql:"AUTO_INCREMENT"`
	Name string
	Email string `sql:"unique;not null"`
	Password []byte
	// Cities Cities
	CitiesID uint
	ImageID uint
	Image Image
	Interests []Interest `gorm:many2many:users_interests;"`
	Events []Event
	// CityID uint `gorm:"ForeignKey:Cities.ID"`
	// ImageID uint `gorm:"ForeignKey:Images.ID"`
}

type Cities struct {
	// gorm.Model
	ID uint
	City_Name string
	// Users []Users
}

type Event struct {
	ID uint
	UsersID uint 
	Location string `sql:"index:event_idx;not null"`
	Date string `sql:"index:event_idx;not null"`
	Time string `sql:"index:event_idx;not null"`
	Description string `sql:"index:event_idx;not null"`
	// gorm.Model
	// Users Users
	// UserID uint
	// Location, Date, Time, Description string
}

type Image struct {
	// gorm.Model
	ID uint 
	ImageUrl string
}

type UserInterest struct {
	// gorm.Model
	// Users Users
	// Interests Interest
	UserID uint `gorm:"ForeignKey:Users.ID"`
	InterestID uint `gorm:"ForeignKey:Interests.ID`
}

type Interest struct {
	// gorm.Model
	ID uint
	Interest_Name string 
}


	// var test Users;
	// var testcity Cities;
	// db.Where(&Users{}).First(&test);
	// db.Model(&test).Related(&testcity);
	// log.Println(testcity);