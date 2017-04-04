package main;

import (
	"net/http"
	"encoding/json"
)

type upload struct {
	Email, ImageUrl string
}

func handleImage(w http.ResponseWriter, req *http.Request) {
	var img upload;
	var u Users;
	var i Image;
	if req.Method == http.MethodPost {
		db.Where(&Users{Email: img.Email}).First(&u);
		defer req.Body.Close();
		json.NewDecoder(req.Body).Decode(&img);
		updateImage(img, u, i);
		successRequest(w, "success", "posted image url");
	} else if req.Method == http.MethodGet {
		img.Email = req.URL.Query()["Email"][0];	
		db.Where(&Users{Email: img.Email}).First(&u);
		fetchImages(u, w);
	}
} 

func updateImage(img upload, u Users, i Image) {
	db.Create(&Image{ImageUrl: img.ImageUrl})
	db.Where(&Image{ImageUrl: img.ImageUrl}).First(&i);
	db.Where("id = ?", u.ImageID).Unscoped().Delete(&Image{});
	u.ImageID = i.ID;
	db.Save(&u);
}

func fetchImages(u Users, w http.ResponseWriter) {
	var i Image;
	db.Where("id = ?", u.ImageID ).First(&i);
	w.Header().Set("Content-Type", "application/json");
	r, _ := json.Marshal(i);
	w.Write(r);
}