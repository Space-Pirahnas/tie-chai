package main;

import (
	"net/http"
	"encoding/json"
)

type upload struct {
	Email, ImageUrl, Image string
}

func handleImage(w http.ResponseWriter, req *http.Request) {
	var img upload;
	var u User;
	if req.Method != http.MethodGet {
		db.Where(&User{Email: img.Email}).First(&u);
		defer req.Body.Close();
		json.NewDecoder(req.Body).Decode(&img);
		if req.Method == http.MethodDelete {
			deleteImage(img, u);
			successRequest(w, "success", "deleted image url");
		}
	} else if req.Method == http.MethodGet {
		img.Email = req.URL.Query()["Email"][0];	
		db.Where(&User{Email: img.Email}).First(&u);
		fetchImages(u, w);
	} 
} 

func updateImage(email string, url string, w http.ResponseWriter) {
	var u User;
	var i Image;
	var updated Image;
	db.Where(&User{Email: email}).First(&u);
	if u.Email == email {
		db.Where(&Image{ID: u.ImageID}).First(&i);
		if i.ID == u.ImageID {
			db.Delete(&i);
		}
		db.Create(&Image{ImageUrl: url});
		db.Where(&Image{ImageUrl: url}).First(&updated);
		u.ImageID = updated.ID;
		db.Save(&u);
	}
}

func fetchImages(u User, w http.ResponseWriter) {
	var i Image;
	db.Where("id = ?", u.ImageID ).First(&i);
	r, _ := json.Marshal(u.Image);
	w.Write(r);
}

func getUserImage(u User) string {
	var img Image;
	db.Where(&Image{ID: u.ImageID}).First(&img);
	return img.ImageUrl;
}

func deleteImage(img upload, u User) {
	var image Image;
	u.ImageID = 0;
	db.Save(&u);
	db.Where(&Image{ImageUrl: img.ImageUrl}).Find(image);
	if image.ImageUrl != "" {
		db.Delete(&image);
	}
}