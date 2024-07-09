import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import TopNavigatoin from './TopNavigation';

function Home () {
  let navigate = useNavigate ();

  let loc = useLocation (); //here we are reciving all details which sent by logIn component

  console.log (loc.state);

  let deleteAccount = async () => {
    // let dataToDel = new FormData ();
    // dataToDel.append ('id', loc.state.eId);

    let url = `http://localhost:4567/deleteAccount?id=${loc.state.eId}`;
    let reqptions = {
      method: 'DELETE',
    };

    let JSONData = await fetch (url, reqptions);
    let JSOData = await JSONData.json ();
    console.log (JSOData.msg);
    navigate ('/');
  };

  return (
    <div>
      <TopNavigatoin userDetails={loc} />
      <br />
      <br />
      <div>
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={deleteAccount}
          >
            Delete Profile
          </button>
        </div>
        <h1>Welcome, {loc.state.firstName} {loc.state.lastName}</h1>
        <img
          src={`http://localhost:4567/${loc.state ? loc.state.profilePic : null}`}
          alt="Profile"
        />
      </div>
    </div>
  );
}

export default Home;
