import React, { useContext, useState } from 'react'
import './login.css'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

const Login = ({ setIsLoggedIn }) => {
  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      if (currState === "Login") {
        // login -> log them in
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
      } else {
        // register -> just show success, then switch back to login
        alert("Registration successful! Please log in.");
        setCurrState("Login");
        setData({ name: "", email: "", password: "" }); // clear form
      }
    }
  }

  return (
    <div className="login-container">
      <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>

      <form onSubmit={onLogin} className="login-input">
        {currState === "Sign Up" && (
          <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
        )}
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />

        <button type="submit" className="login-btn">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p>or Login with</p>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const decoded = jwtDecode(credentialResponse.credential);
              const { email, name } = decoded;

              // Auto-login OR auto-register
              const response = await axios.post(`${url}/api/user/google-login`, { email, name });

              if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
              } else {
                alert(response.data.message);
              }
            } catch (err) {
              console.error("Google login error:", err);
              alert("Google login failed. Please try again.");
            }
          }}
          onError={() => console.log("Google login failed")}
        />

        <div className="login-condition">
          <input type="checkbox" required />
          <label>I agree to the terms & conditions</label>
        </div>
      </form>

      {currState === "Login" ? (
        <p>
          Don’t have an account?{" "}
          <span onClick={() => setCurrState("Sign Up")}>Sign up here</span>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <span onClick={() => setCurrState("Login")}>Login here</span>
        </p>
      )}
    </div>
  )
}

export default Login
