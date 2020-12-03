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

export default function App() {
  
  const [title, setTitle] = useState('test');
  const [backButtonNav, setBackButtonNav] = useState(false);

  return (
    <Router>
      <div className='App'>
        <Header title={title} backButtonNav={backButtonNav}/>
        <div className='App-body'>
          <Switch>
            <Route exact path='/groups' render={() => (
                <Groups setTitle={setTitle}/>
              )} 
            />
            <Route exact path='/pomodoro' render={() => (
                <Pomodoro setTitle={setTitle}/>
              )} 
            />
            <Route exact path='/notebooks' render={() => (
                <Notebooks setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              )} 
            />
            <Route exact path='/notebooks/:notebookTitle' render={() => (
                <Notes setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              )} 
            />
            <Route exact path='/notebooks/:notebookTitle/:noteTitle' render={() => (
                <NoteContents setTitle={setTitle} setBackButtonNav={setBackButtonNav}/>
              )} 
            />
            <Route exact path='/chat' render={() => (
                <Chat setTitle={setTitle}/>
              )} 
            />
            <Route exact path='/rankings' render={() => (
                <Rankings setTitle={setTitle} title='Rankings and Badges'/>
              )} 
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}