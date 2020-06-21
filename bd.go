package main

import (
	"encoding/json"
	"fmt"
	"log"
	"sort"
	"strings"
	"time"

	"github.com/andersonlira/goutils/io"
	"github.com/andersonlira/goutils/str"
)

var bdFolder = "bd"

type item struct {
	ID           string `json:"id"`
	Initial      string `json:"initial"`
	Name         string `json:"name"`
	LowestPrice  int32  `json:"lowestPrice"`
	HighestPrice int32  `json:"highestPrice"`
	LastPrice    int32  `json:"lastPrice"`
	Group        string `json:"group"`
}

func getItems() []item {
	items := []item{}
	listTxt, _ := io.ReadFile(getFileName("items"))
	json.Unmarshal([]byte(listTxt), &items)
	sort.Slice(items, func(i, j int) bool {
		return items[i].Name < items[j].Name
	})
	return items
}

func saveItem(it item) string {
	items := getItems()
	it.ID = str.NewUUID()
	it.Initial = strings.ToUpper(it.Initial)
	items = append(items, it)
	writeItems(items)
	return it.ID
}

func writeItems(items []item) {
	b, err := json.Marshal(items)
	if err != nil {
		log.Println("Error while writiong file items")
		return
	}
	io.WriteFile(getFileName("items"), string(b))
}

type purchase struct {
	ID    string    `json:"id"`
	When  time.Time `json:"when"`
	Qtd   int32     `json:"qtd"`
	Price int32     `json:"price"`
}

func getPurchases(ID string) []purchase {
	purchases := []purchase{}
	listTxt, _ := io.ReadFile(getFileName(ID))
	json.Unmarshal([]byte(listTxt), &purchases)
	return purchases
}

func savePurchase(it purchase, ID string) string {
	items := getPurchases(ID)

	low, high := getStatistics(items, it.Price)
	updateStatistics(ID, low, high, it.Price)
	it.ID = str.NewUUID()
	items = append(items, it)
	b, err := json.Marshal(items)
	if err != nil {
		log.Printf("Error when saving %s\n", it.ID)
		return ""
	}
	io.WriteFile(getFileName(ID), string(b))
	return it.ID
}

func getStatistics(items []purchase, last int32) (low int32, high int32) {
	for _, it := range items {
		if low == 0 || low > it.Price {
			low = it.Price
		}
		if high == 0 || high < it.Price {
			high = it.Price
		}
	}
	if last < low {
		low = last
	}
	if last > high {
		high = last
	}

	if low == 0 {
		low = last
	}

	return
}

func updateStatistics(ID string, low int32, high int32, last int32) {
	items := getItems()
	for i, it := range items {
		if ID == it.ID {
			items[i].LowestPrice = low
			items[i].HighestPrice = high
			items[i].LastPrice = last
			writeItems(items)
			return
		}
	}
}

func getFileName(name string) string {
	return fmt.Sprintf("bd/%s.json", name)
}
