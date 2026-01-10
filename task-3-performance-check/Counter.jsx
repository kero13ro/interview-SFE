import React, { useState } from 'react';

/**
 * Counter Component (Optimized)
 *
 * Isolated from UserList to prevent unnecessary re-renders.
 * When count changes, only this component re-renders.
 *
 * Uses functional update setCount((c) => c + 1) instead of setCount(count + 1)
 * to avoid stale closure issues.
 */
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Increment: {count}
    </button>
  );
};

export default Counter;
