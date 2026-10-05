# 📘 CSharpPractice (C# 알고리즘 실습 프로젝트)

C# 환경에서 퀵 정렬(QuickSort), 너비 우선 탐색(BFS - 독일 도시 그래프), 깊이 우선 탐색(DFS) 알고리즘을 구현 및 실습하는 콘솔 프로젝트입니다.

---

## 📐 1. 모듈 내부 아키텍처 (Module Architecture)

```mermaid
flowchart LR
    subgraph Runner ["Console Entry point"]
        PROG["Program.cs / AlgorithmPractice.cs
(Console Input: qs, bfs, dfs)"]
    end

    subgraph Algorithms ["Algorithm Implementations"]
        QS["QuickSort
(Array Partition & Pivot)"]
        BFS_ALG["BFS.cs
(Germany City Graph Queue Traversal)"]
        DFS_ALG["DFS.cs
(Adjacency List Recursion Traversal)"]
    end

    subgraph GraphData ["Data Structures & Enums"]
        CITY["City Enum
(Frankfurt, Mannheim, Wurzburg...)"]
        LIST["LinkedList<int>[]
(Adjacency List Structure)"]
    end

    PROG -->|qs| QS
    PROG -->|bfs| BFS_ALG
    PROG -->|dfs| DFS_ALG
    BFS_ALG --> CITY
    BFS_ALG --> LIST
    DFS_ALG --> LIST
```

---

## 📂 하위 README 링크
- **[CSharpPractice 소스 README 바로가기](./CSharpPractice/README.md)**: 퀵 정렬, BFS, DFS C# 소스 코드 및 실행 명세.

