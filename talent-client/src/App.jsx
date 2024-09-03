import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';
function App() {
  return (
    <>
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
    </>
  )
}

export default App;
