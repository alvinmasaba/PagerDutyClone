import { BrowserRouter as Router } from "react-router-dom";
import './styles/globals.css';
import Header from './features/Header';
import EmailBox from "./features/EmailBox";
import AppRoutes from "./features/AppRoutes";
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-ca';
import { IncidentsProvider } from "./context/IncidentsProvider";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-ca">
      <IncidentsProvider>
        <Router>
          <Header />
          <AppRoutes />
          <EmailBox />
          <Toaster position='top-right' />
        </Router>
      </IncidentsProvider>
    </LocalizationProvider>
  );
}

export default App
