import './App.css';
import React, { useState } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import Header from './Pages/Main App/Header/Header';
import Groups from './Pages/Main App/Body/Groups/Groups';
import Pomodoro from './Pages/Main App/Body/Pomodoro/Pomodoro';
import Notebooks from './Pages/Main App/Body/Notebooks/Notebooks';
import Chat from './Pages/Main App/Body/Chat/Chat';
import Rankings from './Pages/Main App/Body/Rankings/Rankings';
import Notes from './Pages/Main App/Body/Notebooks/Notes/Notes';
import NoteContents from './Pages/Main App/Body/Notebooks/Notes/NoteContents/NoteContents';
import SignUp from './Pages/Log In/SignUp/SignUp';
import SignIn from './Pages/Log In/SignIn/SignIn';
import JoinGroup from './Pages/Main App/Body/Groups/Join Group/JoinGroup';
import CreateGroup from './Pages/Main App/Body/Groups/Create Group/CreateGroup';

export default function App() {
  
  const [title, setTitle] = useState('');
  const [backButtonNav, setBackButtonNav] = useState(false);

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
            <Route exact path='/groups' render={() => (
              <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Groups setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              </div>
                
              )} 
            />
            <Route exact path='/groups/join-group' render={() => (
              <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <JoinGroup setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              </div>

              )} 
            />
            <Route exact path='/groups/create-group' render={() => (
              <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <CreateGroup setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              </div>

              )} 
            />
            <Route exact path='/pomodoro' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Pomodoro setTitle={setTitle}/>
                </div>
                
              )} 
            />
            <Route exact path='/notebooks' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Notebooks setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
                </div>
                
              )} 
            />
            <Route exact path='/notebooks/:notebookTitle' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Notes setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
                </div>
                
              )} 
            />
            <Route exact path='/notebooks/:notebookTitle/:noteTitle' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <NoteContents setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
                </div>
                
              )} 
            />
            <Route exact path='/chat' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Chat setTitle={setTitle}/>
                </div>
                
              )} 
            />
            <Route exact path='/rankings' render={() => (
                <div className='App-body'>
                  <Header title={title} backButtonNav={backButtonNav}/>
                  <Rankings setTitle={setTitle} title='Rankings and Badges'/>
                </div>
                
              )} 
            />
          </Switch>
      </div>
    </Router>
  );
}