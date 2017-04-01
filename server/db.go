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
}

type Cities struct {
	gorm.Model
	City_Name string
}