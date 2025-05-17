import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from './pages/entry/entry.page';
import Login from './components/login/login.comp';
import Signup from './components/signup/signup.comp'; // Import Signup Component
import Ticket from './pages/ticket/ticket.page';
import Admin from './pages/admin/admin.page'; // Admin Page
import AllQueries from './pages/admin/allQueries.page'; // All Queries Page
import QueryDetails from './pages/admin/queryDetails.page'; // Query Details Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/all-queries" element={<AllQueries />} />
        <Route path="/admin/query/:id" element={<QueryDetails />} /> {/* Dynamic route for query details */}
      </Routes>
    </Router>
  );
}

export default App;