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
    <div className="column">
      <div className="container my-1 is-flex is-justify-content-center loginPadding">
        <div className="has-background-black loginBox">
          <h2 className="is-size-1 has-text-white has-text-centered">SIGN UP</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="cryptonym" className="is-size-3 has-text-white"></label>
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
              <label htmlFor="email" className="is-size-3 has-text-white"></label>
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
              <label htmlFor="pwd" className="is-size-3 has-text-white"></label>
              <input
                className="input is-rounded"
                placeholder="password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end buttons has-addons is-centered">
              <button className="button is-light my-6" type="submit">Submit</button>
            </div>
            <Link to="/login" className="has-text-white">← Already have an account? Click here to login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
