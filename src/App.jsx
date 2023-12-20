import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import PeopleDirectory from './components/peopleDirectory/PeopleDirectory';
import UserProfile from './components/userProfile/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleDirectory />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
