# 📂 Services - 데이터 서비스 레이어 명세

---

## 📄 파일 명세

- **`PizzaService.cs`**:
  - `GetAll()`: `List<Pizza>` 반환
  - `Get(id)`: `Pizzas.FirstOrDefault(p => p.Id == id)`
  - `Add(pizza)`: `pizza.Id = nextId++; Pizzas.Add(pizza);`
  - `Delete(id)`: `Pizzas.Remove(pizza);`
  - `Update(pizza)`: 인덱스 찾은 후 교체
