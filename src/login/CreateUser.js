import React, { useState } from 'react';

const CreateUser = ({createUser}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    createUser({
      firstName,
      lastName,
      username,
      password
    })
  };

  return (
    <div className='row justify-content-center align-items-center'>
      <div className='col-md-4 my-auto'>
        <form className='new-user-form' onSubmit={onSubmit}>
          <h2>Create New Account</h2>
          <div className='w-100 mt-4'>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" id="firstName" value={firstName} onChange={ev => setFirstName(ev.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" id="lastName" value={lastName} onChange={ev => setLastName(ev.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="username" className="form-control" id="username" value={username} onChange={ev => setUsername(ev.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
            </div>
            <button type='submit' className='btn btn-primary mx-auto' disabled={!firstName || !lastName || !username || !password}>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;