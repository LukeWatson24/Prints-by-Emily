import React, { useState } from "react";

import Cookie from "js-cookie";

const Login = ({ setUser, user, logoutHandler, api }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch(`${api}/api/auth/login`, params);
    const data = await response.json();

    if (data.username) {
      setUser(data.username);
      setError("");
      Cookie.set("Admin", data.username);
      console.log(data.username, data.user);
    } else if (data.errors) {
      setError(data.message);
      console.log(data.message);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {user === "" ? (
        <div className="login-container">
          <h1>Admin Log-in</h1>
          <form>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={usernameHandler}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={passwordHandler}
            />

            <button type="submit" onClick={loginHandler}>
              Log-in
            </button>
            <p>{error}</p>
          </form>
        </div>
      ) : (
        <div className="login-container">
          <h1>Logged in as {user}.</h1>
          <button onClick={logoutHandler}>Log-out</button>
        </div>
      )}
    </div>
  );
};

export default Login;
