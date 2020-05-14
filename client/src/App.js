import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import GoalList from './components/GoalList/GoalList';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  function handleAuthentication() {
    fetch("http://localhost:8080/users/is-authenticated", {
      credentials: "include",
      headers: {
        Accept: "application/json",
                "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
      if(res.ok) {
        setIsAuthenticated(true);
      }
    })
  }

  useEffect(() => {
    handleAuthentication();
  }, [isAuthenticated]);


  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </header>
        <main>
          {isAuthenticated ? (
            <>
              <Redirect to="/goals"/>
              <Switch>
                <Route 
                  path="/goals" 
                  component={GoalList} 
                />
                <Route
                  path='/profile'
                  render={() => <Profile isAuthenticated={isAuthenticated} />}
                />
              </Switch>
            </>
          ) : (
            <>
              <Redirect to="/login"/>
              <Switch>
                <Route
                  path='/login'
                  render={() => <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route 
                  path="/signup" 
                  component={Signup} 
                />
              </Switch>
            </>
          )}        
        </main>
      </div>
    </BrowserRouter>
  );
}
