import { BrowserRouter as Router } from "react-router-dom";
import './styles/globals.css';
import Header from './features/Header';
import EmailBox from "./features/EmailBox";
import AppRoutes from "./features/AppRoutes";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <EmailBox />
      <Toaster position='top-right' />
    </Router>
  );
}

export default App
