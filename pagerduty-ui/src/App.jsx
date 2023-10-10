import { BrowserRouter as Router } from "react-router-dom";
import './styles/globals.css';
import IncidentsList from "./features/incidents/IncidentsList"
import Header from './features/Header';

function App() {
  return (
    <Router>
      <Header />
      {/* <IncidentsList /> */}
    </Router>
  );
}

export default App
