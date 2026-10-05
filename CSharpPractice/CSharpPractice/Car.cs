namespace CSharpPractice
{
    public class Car
    {
        private string model;
        private int price;

        public Car(string model)
        {
            this.model = model;
        }

        public string Model
        {
            get { return model; }
            set { model = value; }
        }

        public int Price
        {
            get { return price; }
            set { price = value; }
        }

        public override string ToString()
        {
            return $"price of {model} is {price}";
        }
    }
}