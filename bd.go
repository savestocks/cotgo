package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/andersonlira/goutils/io"
	"github.com/andersonlira/goutils/str"
)

type item struct {
	ID      string `json:"id"`
	Initial string `json:"initial"`
	Name    string `json:"name"`
	Group   string `json:"group"`
}

func getItems() []item {
	items := []item{}
	listTxt, err := io.ReadFile("list.json")
	if err != nil {
		panic("database problem: file list.json not foun")
	}
	json.Unmarshal([]byte(listTxt), &items)
	return items
}

func saveItem(it item) string {
	items := getItems()
	it.ID = str.NewUUID()
	items = append(items, it)
	b, err := json.Marshal(items)
	if err != nil {
		log.Printf("Error when saving %s\n", it.Initial)
		return ""
	}
	io.WriteFile("list.json", string(b))
	return it.ID
}

type purchase struct {
	ID    string    `json:"id"`
	When  time.Time `json:"when"`
	Qtd   int32     `json:"qtd"`
	Price int32     `json:"price"`
}

func getPurchases(ID string) []purchase {
	purchases := []purchase{}
	listTxt, _ := io.ReadFile(fmt.Sprintf("%s.json", ID))
	json.Unmarshal([]byte(listTxt), &purchases)
	return purchases
}

func savePurchase(it purchase, ID string) string {
	items := getPurchases(ID)
	it.ID = str.NewUUID()
	items = append(items, it)
	b, err := json.Marshal(items)
	if err != nil {
		log.Printf("Error when saving %s\n", it.ID)
		return ""
	}
	io.WriteFile("list.json", string(b))
	return it.ID

}
