import './App.css';
import React, { useState } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Groups from './components/Body/Groups/Groups';
import Pomodoro from './components/Body/Pomodoro/Pomodoro';
import Notebooks from './components/Body/Notebooks/Notebooks';
import Chat from './components/Body/Chat/Chat';
import Rankings from './components/Body/Rankings/Rankings';
import Notes from './components/Body/Notebooks/Notes/Notes';
import NoteContents from './components/Body/Notebooks/Notes/NoteContents/NoteContents';
import SignUp from './Pages/Log In/SignUp/SignUp';
import SignIn from './Pages/Log In/SignIn/SignIn';

export default function App() {
  
  const [title, setTitle] = useState('test');
  const [backButtonNav, setBackButtonNav] = useState(false);

  return (
    <Router>
      <div className='App'>
          <Switch>
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
                  <Groups setTitle={setTitle}/>
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