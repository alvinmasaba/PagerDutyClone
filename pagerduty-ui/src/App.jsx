import './App.css';
import IncidentsList from "./features/incidents/IncidentsList"

function App() {
  return <>
  <div className="app">
    <h1>Pagerduty UI</h1>
    <p>Find this application layout in pagerduty_ui/src/App.jsx</p>
    <IncidentsList/>
  </div>
    </>;
}

export default App
