import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

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
import Badges from './Pages/Main App/Body/Rankings/Badges/Badges';
import BadgeDetails from './Pages/Main App/Body/Rankings/Badges/Badge Details/BadgeDetails';

export default function App() {

  return (
    <Router>
      <div className='App'>
        <Switch>

          <Route exact path='/'>
            <Redirect to='/sign-in' />
          </Route>

          <Route exact path='/sign-up'>
            <SignUp />
          </Route>

          <Route exact path='/sign-in'>
            <SignIn />
          </Route>

          <Route exact path='/api/groups'>
            <div className='App-body'>
              <Header />
              <Groups />
            </div>
          </Route>

          <Route exact path='/api/groups/join-group'>
            <div className='App-body'>
              <Header />
              <JoinGroup />
            </div>
          </Route>

          <Route exact path='/api/groups/create-group'>
            <div className='App-body'>
              <Header />
              <CreateGroup />
            </div>
          </Route>

          <Route exact path='/api/pomodoro' >
            <div className='App-body'>
              <Header />
              <Pomodoro />
            </div>
          </Route>

          <Route exact path='/api/notebooks'>
            <div className='App-body'>
              <Header />
              <Notebooks />
            </div>
          </Route>

          <Route exact path='/api/notebooks/:notebookTitle'>
            <div className='App-body'>
              <Header />
              <Notes />
            </div>
          </Route>

          <Route exact path='/api/notebooks/:notebookTitle/:noteTitle'>
            <div className='App-body'>
              <Header />
              <NoteContents />
            </div>
          </Route>

          <Route exact path='/api/chat'>
            <div className='App-body'>
              <Header />
              <Chat />
            </div>
          </Route>

          <Route exact path='/api/rankings'>
            <div className='App-body'>
              <Header />
              <Rankings />
            </div>
          </Route>

          <Route exact path='/api/rankings/badges'>
            <div className='App-body'>
              <Header />
              <Badges />
            </div>
          </Route>

          <Route exact path='/api/rankings/badges/:badgeName'>
            <div className='App-body'>
              <Header />
              <BadgeDetails />
            </div>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}