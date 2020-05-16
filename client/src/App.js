import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import GoalList from './components/GoalList/GoalList';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SendResetEmail from './components/SendResetEmail/SendResetEmail';
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
          <Switch>
            <Route 
              path="/goals" 
              component={GoalList} 
            />
            <Route
              path='/profile'
              component={Profile}
            />
            <Route
              exact path='/'
              render={() => <Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route 
              path="/signup" 
              component={Signup} 
            />
            <Route 
              path="/reset-password/:id" 
              component={ResetPassword} 
            />
            <Route 
              path="/send-reset-password" 
              component={SendResetEmail} 
            />
          </Switch>    
        </main>
      </div>
    </BrowserRouter>
  );
}
