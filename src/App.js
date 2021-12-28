import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useParams} from "react-router-dom";
import {SignProvider} from "./stores/sign-context";
import {SnackbarProvider} from "./stores/snackbar-context";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SnackbarMessage from "./components/SnackbarMessage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import User from "./pages/User";

function App() {
  return (
    <SignProvider>
      <SnackbarProvider>
        <Router>
          <SignIn/>
          <SignUp/>
          <SnackbarMessage/>

          <Header/>

          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route path="/personal">
              {localStorage.getItem("token") ? <Personal/> : <Redirect to="/"/>}
            </Route>

            <Route path="/user/:username">
              <User/>
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </SignProvider>
    );
}

export default App;
