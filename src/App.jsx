import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () =>  {

return (
  <div>
    <header>
      <h1>Reservations</h1>
      <nav>
          <Link to="/reservation">
            <button>Make a Reservation</button>
          </Link> 
      </nav>
      </header>
        <main>
        <Outlet />
        </main>
    </div>
  );
};

export default App;
