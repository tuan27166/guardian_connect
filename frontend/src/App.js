import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import HelpRequestForm from './HelpRequestForm';
import HelpRequestList from './HelpRequestList';

function App() {
  const [view, setView] = useState('signup');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Guardian Connect</h1>
      <div>
        <button onClick={() => setView('signup')}>Signup</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('submit')}>Submit Help Request</button>
        <button onClick={() => setView('view')}>View Help Requests</button>
      </div>

      {view === 'signup' && <Signup />}
      {view === 'login' && <Login setLoggedIn={setLoggedIn} />}
      {view === 'submit' && loggedIn && <HelpRequestForm />}
      {view === 'view' && <HelpRequestList />}

      {!loggedIn && (view === 'submit') && <p>Please log in to submit requests.</p>}
    </div>
  );
}

export default App;
