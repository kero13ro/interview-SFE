import React from 'react';
import Counter from './Counter';
import UserList from './UserList';

/**
 * PERFORMANCE ISSUES IN ORIGINAL CODE:
 *
 * 1. Unnecessary Re-renders
 *    - Counter state (count) and UserList were in the same component
 *    - Every click on "Increment" triggered a re-render of the entire component
 *    - The users.map() operation ran on every count update, even though users didn't change
 *
 * 2. Missing Error Handling
 *    - The fetch call had no .catch() block
 *    - Network failures or API errors would cause unhandled promise rejections
 *
 * 3. Potential Memory Leak
 *    - No cleanup when component unmounts during an in-flight fetch
 *    - setState could be called on an unmounted component
 *
 * OPTIMIZATIONS APPLIED:
 *
 * 1. Component Separation
 *    - Split Counter and UserList into separate components
 *    - Counter state changes no longer affect UserList rendering
 *    - Each component only re-renders when its own state changes
 *
 * 2. Proper Error Handling
 *    - Added error state and .catch() block in UserList
 *    - User sees meaningful error messages instead of silent failures
 *
 * 3. Memory Leak Prevention
 *    - Uses AbortController to cancel in-flight fetch requests on unmount
 *    - More elegant than isMounted flag - actually cancels the network request
 *
 * 4. Functional State Update
 *    - Changed setCount(count + 1) to setCount((c) => c + 1)
 *    - Prevents stale closure issues in event handlers
 */

const UserListPage = () => {
  return (
    <div>
      <h2>User List</h2>
      <Counter />
      <UserList />
    </div>
  );
};

export default UserListPage;
