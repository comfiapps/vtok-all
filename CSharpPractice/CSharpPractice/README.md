# 📂 CSharpPractice - 알고리즘 C# 소스 코드 명세

### 1. `AlgorithmPractice.cs` (알고리즘 분기 러너)
- 콘솔 입력(`qs`, `bfs`, `dfs`)에 따라 각 알고리즘을 실행합니다.

### 2. QuickSort (`AlgorithmPractice.cs`)
```csharp
static int Partition(int[] arr, int left, int right) {
    int pivot = arr[left];
    while (true) {
        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;
        if (left < right) (arr[right], arr[left]) = (arr[left], arr[right]);
        else return right;
    }
}
```

### 3. `BFS.cs` (독일 도시 그래프 너비 우선 탐색)
- `City` 열거형(`Frankfurt`, `Mannheim`, `Wurzburg`, `Kassel`, `Munchen` 등)을 정점으로 연결 리스트(`LinkedList<int>[]`) 기반의 인접 리스트를 구성하고 `queue`를 통해 순회합니다.

### 4. `DFS.cs` (깊이 우선 탐색 - 재귀)
- 연결 리스트로 표현된 노드 그래프를 재귀 함수(`Recursive(int current)`)로 순회하며 방문한 정점을 `visited`에 기록합니다.
