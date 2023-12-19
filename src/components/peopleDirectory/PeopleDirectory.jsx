// PeopleDirectory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './peopleDirectory.css';

const PeopleDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersWithPostCount = await Promise.all(
          response.data.map(async (user) => {
            const postCountResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const postCount = postCountResponse.data.length;
            return { ...user, postCount };
          })
        );
        setUsers(usersWithPostCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='directory-wrapper'>
      <h1>Directory</h1>
      <div>
        {users.map((user) => (
          <Link key={user.id} to={`/user/${user.id}`}>
            <div className='card'>
              <div><b>Name :</b> {user.name}</div>
              <div>Posts: {user.postCount}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PeopleDirectory;
