import React, { useState, useEffect } from 'react';

/**
 * UserList Component (Optimized)
 *
 * Improvements over original code:
 * 1. Separated from Counter - won't re-render when count changes
 * 2. Uses AbortController to cancel in-flight requests on unmount
 * 3. Added loading and error states for better UX
 * 4. Proper error handling with .catch()
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController for canceling fetch on unmount
    const abortController = new AbortController();

    fetch('https://api.example.com/users', {
      signal: abortController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        // Ignore abort errors (expected when component unmounts)
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    // Cleanup: abort the fetch request
    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
