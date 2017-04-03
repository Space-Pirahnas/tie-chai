package main;

import (
	"net/http"
	"encoding/json"
)

type upload struct {
	Email, Image_Url string
}

func handleImage(w http.ResponseWriter, req *http.Request) {
	var img upload;
	var u Users;
	var i Images;
	defer req.Body.Close();
	decoder := json.NewDecoder(req.Body);
	decoder.Decode(&img);
	db.Where(&Users{Email: img.Email}).First(&u);
	if req.Method == http.MethodPost {
		db.Create(&Images{Image_Url: img.Image_Url})
		db.Where(&Images{Image_Url: img.Image_Url}).First(&i);
		db.Where("id = ?", u.Image_ID).Unscoped().Delete(&Images{});
		u.Image_ID = i.ID;
		db.Save(&u);
		successRequest(w, "success", "posted image url");
	}
} 