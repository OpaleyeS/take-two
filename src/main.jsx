import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Reservation from './Reservation.jsx';


//were the components attach to the 'root'<div> in the index.html
ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
 <Router>
    <Routes>
        <Route path='/' element={<App />}>
        <Route path='reservation' element={<Reservation />} />
    </Route>
  </Routes>
</Router>
</React.StrictMode>  
)
