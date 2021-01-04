import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import Header from './Pages/Main App/Header/Header';
import Groups from './Pages/Main App/Body/Groups/Groups';
import Pomodoro from './Pages/Main App/Body/Pomodoro/Pomodoro';
import Notebooks from './Pages/Main App/Body/Notebooks/Notebooks';
import Chat from './Pages/Main App/Body/Chat/Chat';
import Rankings from './Pages/Main App/Body/Rankings/Rankings';
import Notes from './Pages/Main App/Body/Notebooks/Notes/Notes';
import NoteContents from './Pages/Main App/Body/Notebooks/Notes/Note Contents/NoteContents';
import SignUp from './Pages/Log In/SignUp/SignUp';
import SignIn from './Pages/Log In/SignIn/SignIn';
import JoinGroup from './Pages/Main App/Body/Groups/Join Group/JoinGroup';
import CreateGroup from './Pages/Main App/Body/Groups/Create Group/CreateGroup';

export default function App() {

  return (
    <Router>
      <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/sign-in'/>
            </Route>
            <Route exact path='/sign-up' render={() => (
                <SignUp/>
              )}
            />
            <Route exact path='/sign-in' render={() => (
                <SignIn/>
              )}
            />
            <Route exact path='/api/groups' render={() => (
              <div className='App-body'>
                  <Header/>
                  <Groups/>
              </div>
                
              )} 
            />
            <Route exact path='/api/groups/join-group' render={() => (
              <div className='App-body'>
                  <Header/>
                  <JoinGroup/>
              </div>

              )} 
            />
            <Route exact path='/api/groups/create-group' render={() => (
              <div className='App-body'>
                  <Header/>
                  <CreateGroup />
              </div>

              )} 
            />
            <Route exact path='/api/pomodoro' render={() => (
                <div className='App-body'>
                  <Header/>
                  <Pomodoro />
                </div>
                
              )} 
            />
            <Route exact path='/api/notebooks' render={() => (
                <div className='App-body'>
                  <Header/>
                  <Notebooks />
                </div>
                
              )} 
            />
            <Route exact path='/api/notebooks/:notebookTitle' render={() => (
                <div className='App-body'>
                  <Header/>
                  <Notes />
                </div>
                
              )} 
            />
            <Route exact path='/api/notebooks/:notebookTitle/:noteTitle' render={() => (
                <div className='App-body'>
                  <Header/>
                  <NoteContents />
                </div>
                
              )} 
            />
            <Route exact path='/api/chat' render={() => (
                <div className='App-body'>
                  <Header/>
                  <Chat />
                </div>
                
              )} 
            />
            <Route exact path='/api/rankings' render={() => (
                <div className='App-body'>
                  <Header/>
                  <Rankings/>
                </div>
                
              )} 
            />
          </Switch>
      </div>
    </Router>
  );
}