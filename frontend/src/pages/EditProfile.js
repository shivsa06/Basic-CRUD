import React, {useEffect, useRef, useState} from 'react';
import './style.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import TopNavigation from './TopNavigation';

const EditProfile = () => {
  let navigate = useNavigate ();
  let loc = useLocation ();
  console.log (loc.state);

  let firstName = useRef ();
  let lastName = useRef ();
  let mobileNo = useRef ();
  let dob = useRef ();
  let email = useRef ();
  let state = useRef ();
  let profilePicRef = useRef ();
  let [profilePic, setProfilePic] = useState (
    `http://localhost:4567/${loc.state.profilePic}`
  );

  let ProfilePicUrl = () => {
    let selectedURL = URL.createObjectURL (profilePicRef.current.files[0]);
    console.log (selectedURL);
    setProfilePic (selectedURL);
  };

  useEffect (
    () => {
      firstName.current.value = loc.state.firstName;
      lastName.current.value = loc.state.lastName;
      mobileNo.current.value = loc.state.mobileNo;
      dob.current.value = loc.state.dob;
      email.current.value = loc.state.email;
      state.current.value = loc.state.state;
      setProfilePic (`http://localhost:4567/${loc.state.profilePic}`);
    },
    [loc]
  );

  let editData = async () => {
    let dataToSend = new FormData ();
    dataToSend.append ('id', loc.state.eId);
    dataToSend.append ('firstName', firstName.current.value);
    dataToSend.append ('lastName', lastName.current.value);
    dataToSend.append ('mobileNo', mobileNo.current.value);
    dataToSend.append ('dob', dob.current.value);
    dataToSend.append ('email', email.current.value);
    dataToSend.append ('state', state.current.value);
    dataToSend.append ('profilePic', profilePicRef.current.files[0]);

    let url = 'http://localhost:4567/editProfile';

    let reqOptions = {
      method: 'PUT',
      body: dataToSend,
    };

    let JSONData = await fetch (url, reqOptions);
    let JSOData = await JSONData.json ();
    console.log (JSOData);
    console.log (JSOData.msg);
    navigate ('/');
  };

  return (
    <div>
      <TopNavigation />
      <div className="addUser">
        <h3>SignUp</h3>
        <form className="addUserForm">
          <div className="inputGroup">
            <label htmlFor="fName">First Name: </label>
            <input
              type="text"
              id="fName"
              autoComplete="off"
              placeholder="Enter First Name"
              ref={firstName}
            />
            <label htmlFor="lName">Last Name: </label>
            <input
              type="text"
              id="lName"
              autoComplete="off"
              placeholder="Enter Last Name"
              ref={lastName}
            />
            <label htmlFor="mobileNo">Mobile No: </label>
            <input
              type="number"
              id="mobileNo"
              autoComplete="off"
              placeholder="Enter 10 Digit Mobile Number"
              ref={mobileNo}
            />
            <label htmlFor="dob">Date of Birth: </label>
            <input
              type="date"
              id="dob"
              autoComplete="off"
              placeholder="Date of Birth"
              ref={dob}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              placeholder="Enter Email Address"
              ref={email}
            />
            <label htmlFor="state">State: </label>
            <input
              type="text"
              id="state"
              autoComplete="off"
              placeholder="State"
              ref={state}
            />
            <label>Profile Pic</label>
            <input type="file" ref={profilePicRef} onChange={ProfilePicUrl} />
            <img className="imagePreview" src={profilePic} alt="profilePic" />
            <button
              type="button"
              className="btn btn-success"
              onClick={editData}
            >
              Update Profile
            </button>
          </div>
        </form>
        <div className="login">
          <Link to="/" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
