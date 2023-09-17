import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  useEffect(()=>{
    console.log(errors)
  }, [errors])
  if (sessionUser) return <Redirect to="/" />;

  return (
    <div className="loginPage">
      <h1>Log In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginButtons">
          <label>
            {"Email: "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors[0] && <p className="errors">{errors[0].split(": ")[1]}</p>}
          <label>
            {"Password: "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors[1] && <p className="errors">{errors[1].split(": ")[1]}</p>}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
