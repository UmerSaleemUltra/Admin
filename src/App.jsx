import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import AddJob from './Views/AddJob';
import EditJob from './Views/EditJob';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
