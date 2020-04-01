import React, { useState } from 'react';

const Login = ({ login })=> {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    login({ username, password })
      .then(()=> window.location = '#')
      .catch(ex => setError(ex.response.data.message));
  }
  return (
    <div className='login-container bg-primary'>
      <form className='login-form bg-white w-50' onSubmit={ onSubmit } >
        <h2>Login</h2>
        {error && (
          <div className='alert alert-danger'>{ error }</div>
        )}
        <input type='username' className='form-control' placeholder='Username' value={ username } onChange={ ev => setUsername(ev.target.value) } />
        <input type='password' className='form-control' placeholder='Password' value={ password } onChange={ ev => setPassword(ev.target.value) } />
        <button className='btn btn-success w-50 text-white'>Login</button>
      </form>
    </div>
  );
};

export default Login;
