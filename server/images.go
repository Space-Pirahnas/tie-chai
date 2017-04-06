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
	var u User;
	var i Image;
	if req.Method != http.MethodGet {
		db.Where(&User{Email: img.Email}).First(&u);
		defer req.Body.Close();
		json.NewDecoder(req.Body).Decode(&img);
		if req.Method == http.MethodPost {
			updateImage(img, u, i);
			successRequest(w, "success", "posted image url");
		} else if req.Method == http.MethodDelete {
			deleteImage(img, u);
			successRequest(w, "success", "deleted image url");
		}
	} else if req.Method == http.MethodGet {
		img.Email = req.URL.Query()["Email"][0];	
		db.Where(&User{Email: img.Email}).First(&u);
		fetchImages(u, w);
	} 
} 

func updateImage(img upload, u User, i Image) {
	u.Image = Image{ImageUrl: img.ImageUrl};
	db.Save(&u);
	db.Create(&Image{ImageUrl: img.ImageUrl});
	db.Where(&Image{ImageUrl: img.ImageUrl}).First(&i);
	db.Where("id = ?", u.ImageID).Unscoped().Delete(&Image{});
	u.ImageID = i.ID;
	db.Save(&u);
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