import './App.css';
import React, { useState } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Groups from './components/Body/Groups/Groups';
import Pomodoro from './components/Body/Pomodoro/Pomodoro';
import Notebooks from './components/Body/Notebooks/Notebooks';
import Chat from './components/Body/Chat/Chat';
import Rankings from './components/Body/Rankings/Rankings';

export default function App() {
  
  const [title, setTitle] = useState('test');

  return (
    <Router>
      <div className='App'>
        <Header title={title}/>
        <div className='App-body'>
          <Switch>
            <Route path='/groups' render={() => (
                <Groups setTitle={setTitle}/>
              )} 
            />
            <Route path='/pomodoro' render={() => (
                <Pomodoro setTitle={setTitle}/>
              )} 
            />
            <Route path='/notebooks' render={() => (
                <Notebooks setTitle={setTitle}/>
              )} 
            />
            <Route path='/chat' render={() => (
                <Chat setTitle={setTitle}/>
              )} 
            />
            <Route path='/rankings' render={() => (
                <Rankings setTitle={setTitle} title='Rankings and Badges'/>
              )} 
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}