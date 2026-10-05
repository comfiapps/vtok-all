# 📂 CSharpPractice - 알고리즘 C# 소스 코드 명세

### 1. `BFS.cs` (너비 우선 탐색)
```csharp
public class BFS
{
    public void Search(int startNode, List<int>[] adj, bool[] visited)
    {
        Queue<int> q = new Queue<int>();
        q.Enqueue(startNode);
        visited[startNode] = true;

        while (q.Count > 0)
        {
            int curr = q.Dequeue();
            Console.WriteLine($"Visited Node: {curr}");

            foreach (int next in adj[curr])
            {
                if (!visited[next])
                {
                    visited[next] = true;
                    q.Enqueue(next);
                }
            }
        }
    }
}
```

### 2. `DFS.cs` (깊이 우선 탐색 - 재귀)
```csharp
public class DFS
{
    public void Search(int curr, List<int>[] adj, bool[] visited)
    {
        visited[curr] = true;
        Console.WriteLine($"DFS Visited Node: {curr}");

        foreach (int next in adj[curr])
        {
            if (!visited[next])
            {
                Search(next, adj, visited);
            }
        }
    }
}
```
