package main;

import (
	"net/http"
)

func main() {
	test();
	http.Handle("/", http.FileServer(http.Dir("../public/")));
	http.Handle("/bundles/", http.StripPrefix("/bundles/", http.FileServer(http.Dir("../src/bundles/"))))
	http.ListenAndServe(":8080", nil);
}