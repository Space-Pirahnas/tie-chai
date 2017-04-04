package main;

import (
	"net/http"
	"log"
	"encoding/json"
)

func successRequest(w http.ResponseWriter, res string, message string) {
	w.Header().Set("Content-Type", "application/json");
	r, _ := json.Marshal(res);
	log.Println(message);
	w.Write(r);
}