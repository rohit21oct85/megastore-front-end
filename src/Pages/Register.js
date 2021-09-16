import React, { useState } from "react";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  async function handleRegister(e) {
    e.preventDefault();
    let data = {
      name,
      username,
      email,
      password,
    };
    console.log(data);
    await registerMutation.mutate(data);
  }

  return (
    <div className="row">
      <div className="col-md-5 offset-4 products-div p-2">
        <p>Register</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="fullname"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-success text-white w-100">
              <span className="fa fa-gears mr-1"></span>
              Register new Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
