import React, { Fragment, useState } from "react";
import { Route, NavLink, Redirect, Prompt } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";

function PromptRouter() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [age, getAge] = useState(null);

  const onClickHandle = () => {
    setLoggedIn(!loggedIn);
  };

  const onChangeHandle = (e) => {
    getAge(e.target.value);
  };

  return (
    <Fragment>
      <ul>
        <li>
          <NavLink
            className="App-link"
            to="/"
            exact
            activeClassName="link-active-style"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="App-link"
            to="/about"
            exact
            activeClassName="link-active-style"
          >
            About Page
          </NavLink>
        </li>
        <li>
          <NavLink
            className="App-link"
            to="/user/Mike/Elliott"
            exact
            activeClassName="link-active-style"
          >
            User Mike Elliott
          </NavLink>
        </li>
      </ul>
      <Prompt
        when={loggedIn && !age}
        message={(location) => {
          return location.pathname.startsWith("/user") ? true : "Are you sure";
        }}
      ></Prompt>
      <button onClick={onClickHandle}>{loggedIn ? "logout" : "login"}</button>
      <Route
        path="/"
        exact
        render={() => {
          return <h1>Welcome Home</h1>;
        }}
      />
      <Route path="/about" exact component={AboutPage} />
      <Route
        path="/user/:firstname/:lastname"
        exact
        render={({ match }) => {
          return loggedIn ? (
            <h1>
              <h2>Age: {age}</h2>
              <input type="text" value={age} onChange={onChangeHandle} />
              Welcome {match.params.firstname} {match.params.lastname}
            </h1>
          ) : (
            <Redirect to="/"></Redirect>
          );
        }}
      />
    </Fragment>
  );
}

export default PromptRouter;
