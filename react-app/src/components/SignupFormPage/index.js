import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errObj = {};
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
        if (data) {
          for(let issue of data){
            if(issue.includes('email')){
              errObj.email = issue.split(": ")[1];
            }
            if(issue.includes('username')){
              errObj.userName = issue.split(": ")[1]
            }
          }
        }
      } else {
        errObj.password = "Passwords must match"
      }
      setErrors(errObj);
    };

  if (sessionUser) return <Redirect to="/" />;
  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <div className="signupFields">
          <label>
            {"Email: "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label>
            {"Username: "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.userName && <p className="errors">{errors.userName}</p>}
          <label>
            {"Password: "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            {"Confirm Password: "}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errors">Passwords must match</p>}
        </div>
        <button id="signupConfirm" className="clearButton" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
