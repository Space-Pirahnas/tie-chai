package main;

import (
	"net/http"
	// "log"
	// "encoding/json"
	// "golang.org/x/crypto/bcrypt"
)


func main() {
	test();
	bundle := http.StripPrefix("/bundles/", http.FileServer(http.Dir("../src/bundles/")));
	public := http.FileServer(http.Dir("../public/"))
	http.Handle("/", public);
	http.Handle("/bundles/", bundle);
	http.HandleFunc("/api/signup", signUp);
	http.HandleFunc("/api/login", logIn);
	http.ListenAndServe(":8080", nil);
}