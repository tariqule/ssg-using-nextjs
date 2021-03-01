import React from "react";
import axios from "axios";
function UserPage({ users }) {
  return (
    <div>
      <h1>Display users:</h1>
      {users.map((user) => (
        <h3>{user.name}</h3>
      ))}
    </div>
  );
}
const fetchUsers = async () =>
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => ({
      error: false,
      users: response.data,
    }))
    .catch(() => ({
      error: false,
      users: null,
    }));

export const getStaticProps = async () => {
  const data = await fetchUsers();
  return {
    props: data,
  };
};

export default UserPage;
