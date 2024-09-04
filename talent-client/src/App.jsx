import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';

export const GlobalUserContext = createContext();

function App() {
  // const [globalUserId, setGlobalUserId] = useState('');
  // const [globalUserRole, setGlobalUserRole] = useState('');
  const [globalUser, setGlobalUser] = useState();
  
  return (
    <>

    <GlobalUserContext.Provider value={{globalUser,setGlobalUser}}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/register" element={<RegisterComponent />} /> */}
          <Route path="/managerDashboard" element={<ManagerDashboardPage />} />
          <Route path='/candidateDashboard' element={<CandidateDashboardPage/>} />          
        </Routes>
        <Footer />
      </Router>
      </GlobalUserContext.Provider>
    </>
  )
}

export default App;
