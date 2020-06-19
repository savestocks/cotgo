package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/list", listItems)
	http.HandleFunc("/create", createItem)

	http.HandleFunc("/purchases/", handlerPurchase)

	fs := http.FileServer(http.Dir("html/"))
	http.Handle("/html/", http.StripPrefix("/html/", fs))

	err := http.ListenAndServe(":7070", nil)
	panic(err)
}

func listItems(w http.ResponseWriter, r *http.Request) {
	items := getItems()
	returnJSON(w, items)
}

func createItem(w http.ResponseWriter, r *http.Request) {
	it := item{}

	err := json.NewDecoder(r.Body).Decode(&it)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	it.ID = saveItem(it)
	returnJSON(w, it)
}

func handlerPurchase(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Path[len("/purchases/"):]
	if r.Method == "POST" {
		it := purchase{}

		err := json.NewDecoder(r.Body).Decode(&it)
		if it.When.IsZero() {
			it.When = time.Now()
		}
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		it.ID = savePurchase(it, ID)
		returnJSON(w, it)
	} else {
		items := getPurchases(ID)
		returnJSON(w, items)
	}
}

func returnJSON(w http.ResponseWriter, any interface{}) {
	w.Header().Set("Content-Type", "application/json")
	b, _ := json.Marshal(any)
	fmt.Fprintf(w, string(b))
}
