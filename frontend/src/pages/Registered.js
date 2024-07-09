import React from 'react';
import TopNavigation from './TopNavigation';
import {Link} from 'react-router-dom';

const Registered = () => {
  let getEmployee = () => {
    let url = 'http://localhost:4567/employee';
    let reqOptions = {
      method: 'GET',
    };
    let JSONData = fetch (url, reqOptions);
    let JSOData = JSONData.json ();
    console.log (JSOData);
  };

  return (
    <div>
      <TopNavigation />
      <div className="login">
        <Link className="btn btn-primary" onClick={getEmployee}>
          Get All Employees
        </Link>
        <Link to="/" className="btn btn-primary">Login</Link>
      </div>
      <div />
    </div>
  );
};

export default Registered;
