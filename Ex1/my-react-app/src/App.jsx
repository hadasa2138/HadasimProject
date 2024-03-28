import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Members from './Components/Members';
import MemberForm from './Components/MemberForm';
import ExistingMember from './Components/ExistingMember';

function App() {
  return ( 
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<Members />} />
      <Route path="memberDetails/new" element={<MemberForm props={'new'}/>} />
      <Route path="memberDetails/:memberId" element={<ExistingMember />} />
      </Routes>
      </Router>
    </div>);
}

export default App; 
