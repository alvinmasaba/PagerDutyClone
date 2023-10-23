import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/globals.css';
import Incidents from "./features/incidents";
import Header from './features/header';
import TeamMembers from "./features/team-members";
import IncidentDetails from "./features/incident-details";
import TeamMemberDetails from "./features/team-member-details";
import EmailBox from "./features/email-box";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Incidents />}></Route>
        <Route path="/incidents" element={<Incidents />}></Route>
        <Route path="/incidents/:id" element={<IncidentDetails />}></Route>
        <Route path="/team-members" element={<TeamMembers />}></Route>
        <Route path="/team-members/:id" element={<TeamMemberDetails />}></Route>
        {/* <Route path='/add-team-member' element={<Add/>} />
        <Route path='/update-team-member/:id' element={<Edit/>} /> */}
      </Routes>
      <EmailBox />
    </Router>
  );
}

export default App
