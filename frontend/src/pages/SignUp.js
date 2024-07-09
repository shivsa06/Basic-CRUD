import React, { useRef, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [profilePic, setProfilePic] = useState("./images/dummyuser.png");

  let profilePicRef = useRef();
  let navigate = useNavigate();

  let ProfilePicUrl = () => {
    let selectedURL = URL.createObjectURL(profilePicRef.current.files[0]);
    console.log(selectedURL);
    setProfilePic(selectedURL);
  };

  let sendDataToServer = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstName);
    dataToSend.append("lastName", lastName);
    dataToSend.append("mobileNo", mobileNo);
    dataToSend.append("dob", dob);
    dataToSend.append("email", email);
    dataToSend.append("password", password);
    dataToSend.append("state", state);
    dataToSend.append("profilePic", profilePicRef.current.files[0]);

    let reqOptions = {
      method: "POST",
      body: dataToSend
    };
    let url = "http://localhost:4567/signup";

    let JSONData = await fetch(url, reqOptions);
    let JSOData = await JSONData.json();

    console.log(JSOData);
    console.log(JSOData.msg);
    navigate("/");
  };

  return (
    <div className="addUser">
      <h3>SignUp</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="fName">First Name: </label>
          <input
            type="text"
            value={firstName}
            id="fName"
            autoComplete="off"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lName">Last Name: </label>
          <input
            type="text"
            value={lastName}
            id="lName"
            autoComplete="off"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="mobileNo">Mobile No: </label>
          <input
            type="number"
            value={mobileNo}
            id="mobileNo"
            autoComplete="off"
            placeholder="Enter 10 Digit Mobile Number"
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <label htmlFor="dob">Date of Birth: </label>
          <input
            type="date"
            value={dob}
            id="dob"
            autoComplete="off"
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            id="email"
            autoComplete="off"
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            id="password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="state">State: </label>
          <input
            type="text"
            value={state}
            id="state"
            autoComplete="off"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
          <label>Profile Pic</label>
          <input type="file" ref={profilePicRef} onChange={ProfilePicUrl} />
          <img className="imagePreview" src={profilePic} alt="profilePic" />
          <button
            type="button"
            className="btn btn-success"
            onClick={sendDataToServer}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an account ? </p>
        <Link to="/" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;