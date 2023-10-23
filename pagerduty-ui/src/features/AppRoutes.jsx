import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Incidents from './Incidents';
import AddIncident from './incidents/AddIncident';
import TeamMembers from './TeamMembers';
import TeamMemberDetails from './TeamMemberDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Incidents />}></Route>
      <Route path="/incidents" element={<Incidents />}></Route>
      <Route path="/incidents/:id" element={<AddIncident />}></Route>
      <Route path="/team-members" element={<TeamMembers />}></Route>
      <Route path="/team-members/:id" element={<TeamMemberDetails />}></Route>
      {/* <Route path='/add-team-member' element={<Add/>} />
      <Route path='/update-team-member/:id' element={<Edit/>} /> */}
    </Routes>
  )
}
