# Task 3: Performance Check

Identify and fix performance issues in a React component.

## Original Problematic Code

```jsx
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://api.example.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Identified Issues

### MUST FIX (Production Critical)

| Issue | Problem | Severity |
|-------|---------|----------|
| No Error Handling | fetch failure silently ignored, user sees nothing | Critical |
| No Loading State | users see empty list during fetch | High |
| Memory Leak | setState on unmounted component causes warning/leak | High |

### RECOMMENDED (Best Practice)

| Issue | Problem | Severity |
|-------|---------|----------|
| Stale Closure | `setCount(count + 1)` may cause issues with rapid clicks | Low |
| Unnecessary Re-renders | When `count` changes, entire user list re-renders | Low |

## Solution: Component Splitting

Instead of using `React.memo` as a patch, we split into separate components to address the root cause.

### Why Split > Memo?

| Approach | Description |
|----------|-------------|
| **React.memo** | Patches the symptom - prevents re-render but keeps unrelated state together |
| **Component Split** | Fixes the root cause - separates concerns, each component manages its own state |

### Architecture

```
UserListPage.jsx (composition)
├── Counter.jsx    → manages count state
└── UserList.jsx   → manages users/loading/error states
```

When Counter updates, UserList is unaffected because they are sibling components with independent state.

## Files

- `Counter.jsx` - Counter button with independent state
- `UserList.jsx` - User list with error handling, loading state, and cleanup
- `UserListPage.jsx` - Composition of Counter and UserList

## Optimizations Applied

### 1. Component Separation
- Counter and UserList are independent siblings
- No `React.memo` needed - state changes don't cross component boundaries

### 2. Functional State Update
```jsx
onClick={() => setCount((c) => c + 1)}
```
- Avoids stale closure issue with rapid clicks

### 3. isMounted Cleanup Pattern
```jsx
let isMounted = true;
// ... fetch logic checks isMounted before setState
return () => { isMounted = false; };
```
- Prevents state updates after component unmounts

### 4. Error Handling
- Loading state while fetching
- Error display on failure
- HTTP status check with `res.ok`

## Why NOT use React.memo/useCallback here?

1. **Parent has no state** → UserListPage never re-renders, so memo is pointless
2. **Components have no props** → memo comparison is trivial/unnecessary
3. **useCallback on increment** → not passed to memoized children, wasted overhead
