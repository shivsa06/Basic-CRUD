import React, {useState} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  let navigate = useNavigate ();

  let validateLogin = async () => {
    let sendData = new FormData ();
    sendData.append ('email', email);
    sendData.append ('password', password);

    let reqOptions = {
      method: 'POST',
      body: sendData,
    };

    let url = 'http://localhost:4567/validateLogin';

    if (email.length > 0 && password.length > 0) {
      let JSONData = await fetch (url, reqOptions);
      let JSOData = await JSONData.json ();
      console.log (JSOData);
      if (JSOData.isLoggedIn === true) {
        navigate ('/home', {state: JSOData.details});
      } else {
        alert (JSOData.msg);
      }
    }
  };

  return (
    <div className="addUser">
      <h3>LogIn</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            id="email"
            autoComplete="off"
            placeholder="Enter Email Address"
            onChange={e => setEmail (e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            id="password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={e => setPassword (e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={validateLogin}
          >
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an account ? </p>
        <Link to="/signUp" type="button" className="btn btn-success">
          SignUp
        </Link>
        <div className="login">
          <p>Already have an account ? </p>
          <Link to="/registeredEmployee" className="btn btn-primary">
            Registered Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
