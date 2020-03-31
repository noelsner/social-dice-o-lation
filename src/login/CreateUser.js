import React, { useState } from 'react';

const CreateUser = ({createUser, products}) => {
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
    <div className='bg-primary'>
      
      <div className='row justify-content-center new-user-container'>
        <div className='col-md-5 landing-container my-auto mr-4'>
          <div>
            <div>
              <h1 className='text-white'>Social Dice-O-Lation</h1>
              <h3 className='text-success'>Quarantine doesn't have to be boring.</h3>
              <h3 className='text-success'>Stay entertained and socialize with whoever you are quarentined with.</h3>
            </div>
            <div className='pics-carousel'>
              <div className='carousel slide carousel-fade' data-ride='carousel'>
                <div className='carousel inner'>
                  <div className='carousel-item active'>
                    <img className='d-block' src='https://i5.walmartimages.com/asr/56d38936-8c96-4a7f-9725-4439f2abc5a3_1.b584f3c52295ea0456b63ab3b5d9de22.jpeg' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://images-na.ssl-images-amazon.com/images/I/61opBp2cmLL._SX466_.jpg' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://mk0brilliantmaptxoqs.kinstacdn.com/wp-content/uploads/Pandemic-board-game-600x600.jpg?p=3053' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://d8mkdcmng3.imgix.net/a930/board-games-party-and-family-plague-inc-the-board.jpg?auto=format&bg=0FFF&fit=fill&h=600&q=100&w=600&s=71977063e4433a1aedbc11d01af2a0c4' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://target.scene7.com/is/image/Target/GUEST_f7dfce8b-234e-4343-9f30-5d5c0da5230c?wid=488&hei=488&fmt=pjpeg' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://www.gamesworld.com.au/wp-content/uploads/2017/08/monopoly-17-1.jpg' />
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block' src='https://m.media-amazon.com/images/S/aplus-media/sota/527f03fa-1986-4045-b464-e90503b3804b._SR285,285_.JPG' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-5 my-auto ml-md-4'>
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