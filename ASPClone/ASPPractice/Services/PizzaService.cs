namespace DefaultNamespace;

public static class PizzaService
{
    private static List<Pizza> Pizzas { get; }
    private static int nextId = 3;

    static PizzaService()
    {
        Pizzas = new List<Pizza>
        {
            new Pizza {Id = 1, Name = "Classic Italian", IsGlutenFree = false},
            new Pizza {Id = 2, Name = "Veggie", IsGlutenFree = true}
        };
    }

    public static List<Pizza> GetAll() => Pizzas;

    public static Pizza Get(int id) => Pizzas.FirstOrDefault(p => p.Id == id);

    public static void Add(Pizza pizza)
    {
        pizza.Id = nextId++;
        Pizzas.Add(pizza);
    }
}