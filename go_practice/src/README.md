# 📂 go_practice - `src` Go 코드 명세

### `index.go`
- **주요 실습 내용**:
  - 상수(`const`) 및 전역 변수(`var money float32`) 선언
  - 포인터 변수 참조(`&money`, `*leftOver`)
  - 가변 인자 함수(`printThis(msg ...string)`)
  - 문자열 포맷팅 및 반환(`printMsg`)
  - 반복문(`simpleForLoop`)

```go
package main

import "fmt"

const age = 3
var money float32 = 2368723623413.35

func main() {
    name := "eric"
    fmt.Println("Hello world")
    namePrint(name)
}
```

- Go 실행 가이드:
  ```bash
  go run src/index.go
  ```

