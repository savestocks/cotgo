package main

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
	"os"
	"errors"
	"strconv"
	"strings"
)

func main(){
	fmt.Println("Running")
	account,err := findAccount("Millenium - CC")

	if err != nil {
		panic(err)
	}

	fmt.Println(account)
	
}

func findAccount(accountName string) (Account,error){
	gnc := loadXml()
	for i, account := range gnc.Book.Accounts {
		if gnc.Book.Accounts[i].Name == accountName {
			findransaction(gnc,account)
			return  account,nil
		}
	}

	return Account{}, errors.New("Account not found")
}

func loadXml() (gnc Gnc){
    // Open our xmlFile
    xmlFile, err := os.Open("2020.xml")
    // if we os.Open returns an error then handle it
    if err != nil {
        fmt.Println(err)
    }

    fmt.Println("Successfully Opened xml file")
    // defer the closing of our xmlFile so that we can parse it later on
    defer xmlFile.Close()

    // read our opened xmlFile as a byte array.
	byteValue, _ := ioutil.ReadAll(xmlFile)

    // we initialize our Gnc array
    // we unmarshal our byteArray which contains our
    // xmlFiles content into 'gnc' which we defined above
    xml.Unmarshal(byteValue, &gnc)

    // we iterate through every user within our gnc array and
    // print out the user Type, their name, and their facebook url
	// as just an example

	return
}

func findransaction(gnc Gnc,account Account){
	tot := 0
	for _,t := range gnc.Book.Transactions {
		for _,s := range t.Splits.Splits {
			if s.Account == account.ID {
				idx := strings.Index(s.Value,"/")
				v,_ := strconv.Atoi(s.Value[0:idx])
				tot+= v
				fmt.Println(t.Description, s.Value,tot)

			}
		}
	}
}

type Gnc struct {
	Name xml.Name `xml:"gnc"`
	Book Book `xml:"book"`
}
type Book struct{
	XMLName xml.Name `xml:"book"`
	Accounts   []Account   `xml:"account"`
	Transactions []Transaction `xml:"transaction"`

}
type Account struct{
	XMLName xml.Name `xml:"account"`
	ID string `xml:"id"`
	Name    string   `xml:"name"`
	

}
type Transaction struct{
	XMLName xml.Name `xml:"transaction"`
	ID string `xml:"id"`
	Description string `xml:"description"`
	Splits Splits `xml:"splits"`
}

type Splits struct{
	XMLName xml.Name `xml:"splits"`
	Splits []Split `xml:"split"`
}
type Split struct{
	XMLName xml.Name `xml:"split"`
	Account string `xml:"account"`
	Value string `xml:"value"`
}


// the user struct, this contains our
// Type attribute, our user's name and
// a social struct which will contain all
// our social links
// type User struct {
//     XMLName xml.Name `xml:"user"`
//     Type    string   `xml:"type,attr"`
//     Name    string   `xml:"name"`
//     Social  Social   `xml:"social"`
// }
