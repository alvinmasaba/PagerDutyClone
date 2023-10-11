import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/globals.css';
import Incidents from "./features/Incidents";
import Header from './features/Header';
import Team from "./features/Team";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/incidents" element={<Incidents />}></Route>
        <Route path="/team-members" element={<Team />}></Route>
      </Routes>
      {/* <IncidentsList /> */}
    </Router>
  );
}

export default App
