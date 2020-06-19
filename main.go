package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/list", func(w http.ResponseWriter, r *http.Request) {
		items := getItems()
		returnJson(w, items)
	})
	http.HandleFunc("/create", func(w http.ResponseWriter, r *http.Request) {
		it := item{}

		err := json.NewDecoder(r.Body).Decode(&it)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		saveItem(it)
		returnJson(w, it)
	})

	fs := http.FileServer(http.Dir("html/"))
	http.Handle("/html/", http.StripPrefix("/html/", fs))

	err := http.ListenAndServe(":7070", nil)
	panic(err)
}

func returnJson(w http.ResponseWriter, any interface{}) {
	b, _ := json.Marshal(any)
	fmt.Fprintf(w, string(b))
}
