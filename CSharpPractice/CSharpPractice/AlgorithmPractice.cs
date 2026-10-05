using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSharpPractice
{
    public class AlgorithmPractice
    {
        public AlgorithmPractice()
        {
            Console.Write("\n\nEnter Function (qs, bfs, dfs): ");

            try
            {
                ExecuteFunction execute = ExecuteFunctionMethods.stringToEnum(Console.ReadLine());

                Console.Clear();
                if (execute == ExecuteFunction.qs) QuickSort();
                else if (execute == ExecuteFunction.bfs) BFS();
                else if (execute == ExecuteFunction.dfs) DFS();
            }
            catch (Exception e)
            {
                Console.WriteLine("****** Incorrect value. Try again ******");
            }
        }
        
        private void QuickSort()
        {
            int[] data = {67, 12, 95, 56, 85, 1, 100, 23, 60, 9, 44};
            Console.WriteLine($"Initial: {string.Join(" ", data)}");
            
            Recursive(data, 0, data.Length - 1);
            Console.WriteLine($"Sorted : {string.Join(" ", data)}");
        }
        
        static int Partition(int[] arr, int left, int right) {
            int pivot = arr[left];
            while (true) {
                while (arr[left] < pivot) left++;
                while (arr[right] > pivot) right--;
                if (left < right) (arr[right], arr[left]) = (arr[left], arr[right]);
                else return right;
            }
        }
        
        static void Recursive(int[] arr, int left, int right) {
            int pivot;
            
            if (left < right) {
                pivot = Partition(arr, left, right);
                if (pivot > 1) Recursive(arr, left, pivot - 1);
                if (pivot + 1 < right) Recursive(arr, pivot + 1, right);
            }
        }
        
        private void BFS()
        {
            BFS bfs = new BFS();
            bfs.Function();
            bfs.ResultOut();
        }
        
        private void DFS()
        {
            DFS dfs = new DFS();
            dfs.Function();
            dfs.ResultOut();
        }
    }
}