# 📂 ASPPractice - 컨트롤러 및 C# 서비스 코드 명세

### 1. `Models/Pizza.cs` & `Services/PizzaService.cs`
- `Pizza` 모델: `int Id`, `string Name`, `bool IsGlutenFree`
- `PizzaService` 인메모리 데이터 조작 함수:
  - `GetAll()`: `List<Pizza>` 반환
  - `Get(int id)`: `Pizzas.FirstOrDefault(p => p.Id == id)`
  - `Add(Pizza pizza)`: `pizza.Id = nextId++; Pizzas.Add(pizza);`
  - `Delete(int id)`: `Pizzas.Remove(pizza);`
  - `Update(Pizza pizza)`: 인덱스 찾은 후 교체

### 2. `Controllers/PizzaController.cs`
- `GET /pizza`: `PizzaService.GetAll()` ➔ `ActionResult<List<Pizza>>` (HTTP 200)
- `GET /pizza/{id}`: `PizzaService.Get(id)` ➔ 존재 시 HTTP 200, 없으면 HTTP 404 NotFound
- `POST /pizza`: `PizzaService.Add(pizza)` ➔ `CreatedAtAction` (HTTP 201 Created)
- `PUT /pizza/{id}`: `PizzaService.Update(pizza)` ➔ HTTP 204 NoContent
- `DELETE /pizza/{id}`: `PizzaService.Delete(id)` ➔ HTTP 204 NoContent
