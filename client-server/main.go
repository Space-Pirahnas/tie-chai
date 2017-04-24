package main;

import (
	"net/http"
	"fmt"
)

func Serving(port string) {
	fmt.Println("Serving on Port " + port);
}

func main() {
	port:= ":8000";
	bundle := http.StripPrefix("/bundles/", http.FileServer(http.Dir("../src/bundles/")))
	public := http.FileServer(http.Dir("../public/"))
	http.Handle("/", public)
	http.Handle("/bundles/", bundle)
	Serving(port);
	http.ListenAndServe(port, nil)
}
