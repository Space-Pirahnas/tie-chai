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
			u.deleteImage(img);
			successRequest(w, "success", "deleted image url");
		}
	} else if req.Method == http.MethodGet {
		img.Email = req.URL.Query()["Email"][0];	
		db.Where(&User{Email: img.Email}).First(&u);
		i := u.fetchImages();
		r, _ := json.Marshal(i);
		w.Write(r);
	} 
} 

func (u *User) updateImage(url string) {
	var i Image;
	var updated Image;
	db.Where(&Image{ID: u.ImageID}).First(&i);
	if i.ID == u.ImageID {
		db.Delete(&i);
	}
	db.Create(&Image{ImageUrl: url});
	db.Where(&Image{ImageUrl: url}).First(&updated);
	u.ImageID = updated.ID;
	db.Save(&u);
}

func (u User) fetchImages() Image {
	var i Image;
	db.Where("id = ?", u.ImageID ).First(&i);
	return i;
}

func (u User) getUserImage() string {
	var img Image;
	db.Where(&Image{ID: u.ImageID}).First(&img);
	if img.ID == u.ImageID {
		return img.ImageUrl;
	} else {
		return "";
	}
}

func (u User) deleteImage(img upload) {
	var image Image;
	u.ImageID = 0;
	db.Save(&u);
	db.Where(&Image{ImageUrl: img.ImageUrl}).Find(image);
	if image.ImageUrl != "" {
		db.Delete(&image);
	}
}