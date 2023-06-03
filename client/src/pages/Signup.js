import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        cryptonym: formState.cryptonym,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      

      <h2 className="is-size-1 has-text-white">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="cryptonym" className="is-size-3 has-text-white">Cryptonym:</label>
          <input
          className="input is-rounded"
            placeholder="cryptonym"
            name="cryptonym"
            type="cryptonym"
            id="cryptonym"
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="email" className="is-size-3 has-text-white">Email:</label>
          <input
          className="input is-rounded"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd" className="is-size-3 has-text-white">Password:</label>
          <input
          className="input is-rounded"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="button is-light my-3" type="submit">Submit</button>
        </div>
        <Link to="/login">← Already have an account? Click here to login</Link>
      </form>
    </div>
  );
}

export default Signup;
