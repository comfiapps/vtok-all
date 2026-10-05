using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSharpPractice
{
    public class DFS
    {
        
        LinkedList<int>[] list = new LinkedList<int>[10];
        LinkedList<int> visited = new LinkedList<int>();
        
        public DFS()
        {
            Console.WriteLine("Source: https://he-s3.s3.amazonaws.com/media/uploads/9fa1119.jpg");

            for (int i = 0; i < list.Length; i++) list[i] = new LinkedList<int>();
            list[1].AddLast(2);
            list[1].AddLast(3);
            list[2].AddLast(1);
            list[2].AddLast(4);
            list[2].AddLast(5);
            list[3].AddLast(1);
            list[4].AddLast(2);
            list[5].AddLast(2);
        }
        
        public void Function()
        {
            Recursive(1);
        }

        private void Recursive(int current)
        { 
            Console.WriteLine($"\n\nCurrent: {current}");
            
            Console.Write("Visited: ");
            foreach (var value in visited) Console.Write(value + " ");
            
            visited.AddLast(current);
            
            LinkedList<int> stage = list[current];
            foreach (var index in stage) if (!visited.Contains(index)) Recursive(index);
        }

        public void ResultOut()
        {
            Console.WriteLine("\n\n\n============================== RESULT ================================");
            foreach (var value in visited) Console.Write(value + " -> ");
            Console.WriteLine("\n======================================================================\n\n");
        }
    }
}