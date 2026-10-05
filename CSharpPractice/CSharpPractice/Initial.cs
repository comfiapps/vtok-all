using System;

namespace CSharpPractice
{
    public class Init
    {
        public Init()
        {
            Car car = new Car("Ford");
            car.Price = 3482;
            Console.WriteLine($"model: {car.Model} / price: {car.Price}");
            Console.WriteLine(car.ToString());
            customMethod();
        }

        static void customMethod()
        {
            Console.Write("Enter name: ");
            string inputName = Console.ReadLine();
            
            Console.Write("Enter age: ");
            int inputAge = Convert.ToInt16(Console.ReadLine());
            
            Console.WriteLine($"my name is '{inputName}' age {inputAge}");
            
        }
    }
}