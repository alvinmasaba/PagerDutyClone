import { BrowserRouter as Router } from "react-router-dom";
import './styles/globals.css';
import Header from './features/header';
import EmailBox from "./features/email-box";
import AppRoutes from "./features/AppRoutes";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <EmailBox />
    </Router>
  );
}

export default App
