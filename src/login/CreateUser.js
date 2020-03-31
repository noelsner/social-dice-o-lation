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
    });
    HashChangeEvent
  };

  return (
    <div className=''>
      
      <div className='row justify-content-end new-user-container'>
        <div className='col-md-6 landing-container my-auto'>
          <div className='align-items-start'>
            <h1 className='text-white'>Social Dice-O-Lation</h1>
            <h3 className='text-success'>Quarantine doesn't have to be boring.</h3>
            <h3 className='text-success'>Find fun games to stay entertained and social with whoever you are quarentined with.</h3>
          </div>
        </div>
        <div className='col-md-5 my-auto mr-md-4'>
          <form className='new-user-form' onSubmit={onSubmit}>
            <h3>Create New Account</h3>
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
              <a href='#view=cart'><button type='button' onClick={onSubmit} className='btn btn-success w-100 mb-2' disabled={!firstName || !lastName || !username || !password}>Create Account</button></a>
            </div>
            <div>Already have an account? Login <a href='#view=login'className='text-info'>here</a></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;