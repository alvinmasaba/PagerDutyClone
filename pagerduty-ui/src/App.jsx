import { BrowserRouter as Router } from "react-router-dom";
import './styles/globals.css';
import Header from './features/Header';
import EmailBox from "./features/EmailBox";
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
