import React, {  useState, useEffect } from 'react';

const Login = ({ login })=> {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    login({ username, password })
      .catch(ex => setError(ex.response.data.message));
  }
  return (
    <div className='login-container'>
      <form onSubmit={ onSubmit } >
        <h1>Login</h1>
        {error && (
          <div className='alert alert-danger'>{ error }</div>
        )}
        <input type='username' className='form-control' placeholder='Username' value={ username } onChange={ ev => setUsername(ev.target.value) } />
        <input type='password' className='form-control' placeholder='Password' value={ password } onChange={ ev => setPassword(ev.target.value) } />
        <button className='btn btn-primary w-50'>Login</button>
      </form>
    </div>
  );
};

export default Login;
