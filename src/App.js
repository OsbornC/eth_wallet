import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from './balance/components/App';
import Request from "./request/components/App";
import Donation from './pages/Donation/Donationdraft';
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Profile from "./pages/Profile/Profile"
import User from "./pages/Profile/User"


function App() {
  const [openPopup, setOpenSend] = useState(true)
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <MainLayout>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/transaction" component={FAQ} />
          <Route path="/request" component={Request} />
          <Route path="/donation" component={Donation} />
          <Route path="/profile" component={Profile} />
        </MainLayout >
        
        
      </Switch >
    </Router >
  );
}

export default App;
