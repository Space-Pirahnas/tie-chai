package main;

import (
	"net/http"
	"log"
	"encoding/json"
)

func successRequest(w http.ResponseWriter, res string, message string) {
	r, _ := json.Marshal(res);
	log.Println(message);
	w.Write(r);
}

func badRequest(w http.ResponseWriter, message string, status int) {
	log.Println(message, status);
	http.Error(w, message, status);
}


