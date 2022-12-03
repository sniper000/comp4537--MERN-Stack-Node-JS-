import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    console.log("username: " + username);
    console.log("password: " + password);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6020/login", {
        username,
        password,
      });
      console.log(res.data);
      console.log("username: " + res.data.username);
      console.log("password: " + res.data.password);
      console.log("accessToken: " + res.headers["auth-token-access"]);
      // console.log("msg: " + res.data.msg);
      // console.log("user: " + res.data.userInfo.username);
      // console.log("password: " + res.data.userInfo.password);
      setUser(res.data);
      setAccessToken(res.headers["auth-token-access"]);
      setRefreshToken(res.headers["auth-token-refresh"]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user?.username ? (
        <>
          <h3>Welcome {user.username}</h3>
          <Dashboard
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        </>
      ) : (
        <>
          <h5>Admin Login</h5>
          <form onSubmit={handleSubmit}>
            <label>Username</label> <br />
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <label>Password</label> <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </>
  );
}

export default AdminLogin;
