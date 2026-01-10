const { solution } = require('./solution');

const tests = [
  { A: [3, 1, 2], B: [2, 3, 1], expected: true, name: '3-vertex cycle' },
  { A: [1, 2, 1], B: [2, 3, 3], expected: false, name: 'multiple outgoing edges' },
  { A: [1, 2, 3, 4], B: [2, 1, 4, 4], expected: false, name: 'self-loop' },
  { A: [1, 2, 3, 4], B: [2, 1, 4, 3], expected: false, name: 'two disjoint cycles' },
  { A: [1, 3, 2, 4], B: [4, 1, 3, 2], expected: true, name: '4-vertex cycle' },
  { A: [1], B: [1], expected: true, name: 'single vertex self-loop' },
  { A: [1, 2], B: [2, 1], expected: true, name: '2-vertex cycle' },
  { A: [1, 2, 3], B: [2, 3, 4], expected: false, name: 'chain without cycle' },
];

let passed = 0;
let failed = 0;

tests.forEach(({ A, B, expected, name }) => {
  const result = solution(A, B);
  if (result === expected) {
    console.log(`✓ ${name}`);
    passed++;
  } else {
    console.log(`✗ ${name}: expected ${expected}, got ${result}`);
    failed++;
  }
});

console.log(`\n${passed}/${tests.length} tests passed`);
process.exit(failed > 0 ? 1 : 0);
