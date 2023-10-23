import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Incidents from './incidents';
import IncidentDetails from './incident-details';
import TeamMembers from './team-members';
import TeamMemberDetails from './team-member-details';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Incidents />}></Route>
      <Route path="/incidents" element={<Incidents />}></Route>
      <Route path="/incidents/:id" element={<IncidentDetails />}></Route>
      <Route path="/team-members" element={<TeamMembers />}></Route>
      <Route path="/team-members/:id" element={<TeamMemberDetails />}></Route>
      {/* <Route path='/add-team-member' element={<Add/>} />
      <Route path='/update-team-member/:id' element={<Edit/>} /> */}
    </Routes>
  )
}
