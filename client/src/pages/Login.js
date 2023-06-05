import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Hero from "../components/Hero";
import obAnimated from "../assets/obAnimated.gif";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
        <div className="has-background-black loginBox ">
          <h2 className="is-size-1 has-text-white has-text-centered">LOGIN</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email" className="is-size-3 has-text-white"></label>
              <input
                className="input is-rounded"
                placeholder="email"
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
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div className="flex-row flex-end buttons has-addons is-centered">
              <button type="submit" className="button is-light my-6">Sign In</button>
            </div>
          </form>

          <Link to="/signup" className="has-text-white">← Don't have an account? Click to Sign Up</Link>
        </div>


      </div>
    </div>
  );
}

export default Login;
