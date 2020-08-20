import React from 'react';
import './App.css';
import { Sidebar } from './Sidebar';
import { Chat } from './Chat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './Login';
import { useStateValue } from './stateProvider';

function App() {
  const [{user}] = useStateValue();
  return (
    <div className="app">
        {
          !user ? (<Login />):
          (
              <div className="app__body">
                <BrowserRouter>
                  <Sidebar />
                  <Switch>
                    <Route path="/rooms/:roomId">
                        <Chat />
                    </Route>
                    <Route path="/">
                        <Chat />
                    </Route>
                  </Switch>
                </BrowserRouter>
              </div>
          )
        }
    </div>
  );
}

export default App;
