package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type proxyHandler struct {
	origin http.Handler
}

//ServerHTTP implements Handler interface
func (p proxyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", fmt.Sprintf("public,max-age=%d", 1))
	p.origin.ServeHTTP(w, r)
}
func main() {
	http.HandleFunc("/list", listItems)
	http.HandleFunc("/create", createItem)

	http.HandleFunc("/purchases/", handlerPurchase)

	fs := http.FileServer(http.Dir("html/"))
	ph := proxyHandler{fs}
	http.Handle("/html/", http.StripPrefix("/html/", ph))

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
	if err != nil || it.Group == "" || it.Name == "" {
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
		if err != nil || it.Price == 0 || it.Qtd == 0 {
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
