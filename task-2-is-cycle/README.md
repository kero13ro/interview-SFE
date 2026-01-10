# Task 2: Is Cycle

Detect if a directed graph forms a single Hamiltonian cycle.

## Problem

Given two arrays A and B of length N, where each pair (A[i], B[i]) represents a directed edge from vertex A[i] to vertex B[i], determine if the graph forms a single cycle that visits all vertices exactly once.

## Examples

```
A = [1, 3, 2, 4], B = [4, 1, 3, 2]  →  true  (cycle: 1→4→2→3→1)
A = [1, 2, 3, 4], B = [2, 1, 4, 3]  →  false (two disjoint cycles: 1↔2, 3↔4)
A = [1, 2, 3, 4], B = [2, 1, 4, 4]  →  false (self-loop at vertex 4)
```

## Algorithm

### Conditions for a Valid Cycle
1. Each vertex has exactly **one outgoing edge** (no duplicate sources in A)
2. Total unique vertices = N (all vertices connected)
3. Traversing N steps from start returns to start
4. All N vertices are visited during traversal

### Time Complexity: O(N)
- Build adjacency map: O(N)
- Build vertex set: O(N)
- Traverse cycle: O(N)

### Space Complexity: O(N)
- Adjacency map: O(N)
- Vertex sets: O(N)

## Files

- `solution.js` - Algorithm implementation
