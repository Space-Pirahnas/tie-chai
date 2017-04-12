package main;

import (
	"net/http"
	"encoding/json"
)

func handleYelp(w http.ResponseWriter, req *http.Request) {
	client := &http.Client{}

	// TODO: use URL.Query to generate query string
	req, _ := http.NewRequest("GET", "https://api.yelp.com/v3/businesses/search?term=food&location=san-francisco", nil)
	// TODO: make a seperate post call to get token, and add to header
	req.Header.Add("Authorization", "Bearer bXTM7s3UZpMS8aQyzldGE7l98wMw9qrrPbuD2iAAGXzaZsU4HF1LzhvqRW2Xu_W_pwu8uC87pXh2T4lPcQtDpH6omZ-xEemXBgFx5yNrAsnWosxltEo7P0RafE_tWHYx")

	resp, _ := client.Do(req)

	data, _ := ioutil.ReadAll(resp.body)

  w.Write(data)	
}
