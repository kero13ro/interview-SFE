/**
 * Determines if a directed graph forms a single Hamiltonian cycle.
 * @param {number[]} A - Source vertices of edges
 * @param {number[]} B - Destination vertices of edges
 * @returns {boolean} - True if graph forms exactly one cycle visiting all vertices
 */
function solution(A, B) {
  const n = A.length;

  if (n === 0) return false;

  // Build adjacency map: each vertex must have exactly one outgoing edge
  const next = new Map();
  for (let i = 0; i < n; i++) {
    if (next.has(A[i])) return false; // Duplicate source = multiple outgoing edges
    next.set(A[i], B[i]);
  }

  // A cycle of N edges must have exactly N unique vertices
  const allVertices = new Set([...A, ...B]);
  if (allVertices.size !== n) return false;

  // Traverse: must visit all N vertices and return to start in exactly N steps
  const start = A[0];
  let current = start;
  const visited = new Set();

  for (let i = 0; i < n; i++) {
    if (visited.has(current)) return false; // Premature cycle (smaller than N)
    visited.add(current);

    current = next.get(current);
    if (current === undefined) return false; // Broken chain
  }

  return current === start && visited.size === n;
}

module.exports = { solution };
