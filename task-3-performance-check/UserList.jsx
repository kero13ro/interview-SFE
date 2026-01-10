import React, { useState, useEffect } from 'react';

/**
 * UserList Component (Optimized)
 *
 * Improvements over original code:
 * 1. Separated from Counter - won't re-render when count changes
 * 2. Added isMounted flag to prevent memory leaks
 * 3. Added loading and error states for better UX
 * 4. Proper error handling with .catch()
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag to prevent setState on unmounted component
    let isMounted = true;

    fetch('https://api.example.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        // Only update state if component is still mounted
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        // Handle errors gracefully
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup: mark as unmounted to prevent memory leaks
    return () => {
      isMounted = false;
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
