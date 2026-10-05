package main

import "fmt"

const age = 3

var money float32 = 2368723623413.35

func main() {
	name := "eric"
	fmt.Println("Hello world")
	namePrint(name)
}

func namePrint(s1 string) {
	var leftOver = &money
	printThis("a", "b", "c")
	goto L1

L1:
	fmt.Printf(printMsg(s1, age, *leftOver))
}

func printThis(msg ...string) {
	for _, s := range msg {
		fmt.Println("hi " + s)
	}
}

func printMsg(name string, age int, leftOver float32) string {
	return "hi " + name + ", you are " + string(age) + "years old, but you've already got $" + string(leftOver)
}

func simpleForLoop() {
	for i := 0; i < 10; i++ {
		fmt.Println("hi ")
	}
}
