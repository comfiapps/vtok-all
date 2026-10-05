using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSharpPractice
{
    public class BFS
    {
        
        LinkedList<int>[] list = new LinkedList<int>[10];
        LinkedList<int> visited = new LinkedList<int>();
        LinkedList<int> queue = new LinkedList<int>();
        
        public BFS()
        {
            Console.WriteLine("Source: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/MapGermanyGraph.svg/500px-MapGermanyGraph.svg.png");
            Console.WriteLine("Expected: https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/GermanyBFS.svg/500px-GermanyBFS.svg.png");

            for (int i = 0; i < list.Length; i++) list[i] = new LinkedList<int>();
            
            list[(int) City.Frankfurt].AddLast((int) City.Mannheim);
            list[(int) City.Frankfurt].AddLast((int) City.Wurzburg);
            list[(int) City.Frankfurt].AddLast((int) City.Kassel);
            list[(int) City.Mannheim].AddLast((int) City.Karisruhe);
            list[(int) City.Wurzburg].AddLast((int) City.Nurnberg);
            list[(int) City.Wurzburg].AddLast((int) City.Erfurt);
            list[(int) City.Kassel].AddLast((int) City.Munchen);
            list[(int) City.Karisruhe].AddLast((int) City.Augsburg);
            list[(int) City.Nurnberg].AddLast((int) City.Stuttgart);
            list[(int) City.Mannheim].AddLast((int) City.Frankfurt);
            list[(int) City.Wurzburg].AddLast((int) City.Frankfurt);
            list[(int) City.Stuttgart].AddLast((int) City.Nurnberg);
            list[(int) City.Kassel].AddLast((int) City.Frankfurt);
            list[(int) City.Karisruhe].AddLast((int) City.Mannheim);
            list[(int) City.Erfurt].AddLast((int) City.Wurzburg);
            list[(int) City.Nurnberg].AddLast((int) City.Wurzburg);
            list[(int) City.Nurnberg].AddLast((int) City.Munchen);
            list[(int) City.Augsburg].AddLast((int) City.Karisruhe);
            list[(int) City.Augsburg].AddLast((int) City.Munchen);
            list[(int) City.Munchen].AddLast((int) City.Augsburg);
            list[(int) City.Munchen].AddLast((int) City.Nurnberg);
            list[(int) City.Munchen].AddLast((int) City.Kassel);
            
            queue.AddLast((int) City.Frankfurt);
        }
        
        public void Function()
        {
            while (queue.Any())
            {
                int current = queue.First();
                Console.WriteLine($"\n\nCurrent: {(City) current}");
                queue.RemoveFirst();

                Console.Write("Visited: ");
                foreach (var value in visited) Console.Write((City) value + " ");
                
                Console.Write("\nQueue  : ");
                foreach (var value in queue) Console.Write((City) value + " ");
                
                LinkedList<int> stage = list[current];
                
                foreach (var index in stage) 
                    if (!visited.Contains(index) && !queue.Contains(index)) queue.AddLast(index);
                
                visited.AddLast(current);
            }
        }

        public void ResultOut()
        {
            Console.WriteLine("\n\n\n============================== RESULT ================================");
            foreach (var value in visited) Console.Write((City) value + " -> ");
            Console.WriteLine("\n======================================================================\n\n");
        }
    }
}