import React from 'react';
import Counter from './Counter';
import UserList from './UserList';

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
