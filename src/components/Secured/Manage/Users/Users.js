import React, { useState, useEffect } from 'react';
import SellerDropdown from '../../Custom/SellerDropdown/SellerDropdown';
import RoleDropdown from '../../Custom/RoleDropdown/RoleDropdown';
import api from '../../../../apis/api';

const Users = () => {
  const userTamplate = {
    _id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    userPassword: '',
    phone: '',
    email: '',
    isActive: true,
    role: { type: 'Seller' },
  };

  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(userTamplate);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const onUserChange = (id) => {
    const _id = id.target.value;
    if (_id === '0') {
      console.log(userTamplate);
      setCurrentUser(userTamplate);
      return;
    }
    const user = users.find((x) => x._id === _id);
    setCurrentUser(user);
  };

  const onActiveChange = (e) => {
    setCurrentUser({ ...currentUser, isActive: e.target.checked });
  };
  const inputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const onUpdate = async () => {
    console.log(currentUser);
    const { data } = await api.post('/users/save-user', {
      _id: currentUser._id,
      update: currentUser,
    });
    console.log(data._id);
    if (data._id != '0') {
      console.log('here');
      setUsers(
        users.map((user) => {
          return user._id === currentUser._id ? { ...currentUser } : user;
        })
      );
    } else {
      setUsers([...users, data]);
      setCurrentUser(data);
    }
  };
  const buttonText = currentUser._id === 0 ? 'Create new user' : 'Update user';
  return (
    <div class='users'>
      <SellerDropdown
        className='seller-dropdown'
        users={users}
        onUserChange={onUserChange}
        currentUser={currentUser}
      />
      <div className='manage__sellers'>
        <div>
          <input
            type='checkbox'
            checked={currentUser.isActive}
            onChange={onActiveChange}
          />
          <label> Active</label>
        </div>
        <input
          type='text'
          value={currentUser.firstName}
          onChange={inputChange}
          placeholder='First Name'
          name='firstName'
        />
        <input
          type='text'
          value={currentUser.lastName}
          placeholder='Last Name'
          onChange={inputChange}
          name='lastName'
        />
        <input
          type='text'
          value={currentUser.phone}
          placeholder='Phone'
          onChange={inputChange}
          name='phone'
        />
        <input
          type='text'
          value={currentUser.email}
          placeholder='Email'
          onChange={inputChange}
          name='email'
        />
        <input
          type='text'
          value={currentUser.userName}
          placeholder='User name'
          onChange={inputChange}
          name='userName'
        />
        <input
          type='text'
          value={currentUser.userPassword}
          placeholder='Password'
          onChange={inputChange}
          name='userPassword'
        />
        <div>
          <RoleDropdown user={currentUser} onChange={() => {}} />
        </div>
        <div>
          <button class='button bg-success' onClick={onUpdate}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;