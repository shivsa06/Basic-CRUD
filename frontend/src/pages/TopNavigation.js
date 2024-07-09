import React from 'react';
import {useNavigate} from 'react-router-dom';

function TopNavigation (props) {
  
  let navigate = useNavigate ();

  let home = () => {
    navigate ('/home', {state: props.userDetails});
  };

  let editProfile = () => {
    navigate ('/editProfile', {state: props.userDetails.state});
  };

  let logOut = () => {
    navigate ('/', {state: props.userDetails});
  };

  return (
    <nav>
      <button type="button" className="btn btn-success" onClick={home}>
        Home
      </button>
      <button type="button" className="btn btn-success" onClick={editProfile}>
        Edit Profile
      </button>
      <button type="button" className="btn btn-success" onClick={logOut}>
        Log Out
      </button>
    </nav>
  );
}

export default TopNavigation;
