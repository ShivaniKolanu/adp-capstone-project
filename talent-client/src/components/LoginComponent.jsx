import React, { useEffect, useState } from "react";
import talent from '../assets/talent1-removebg-preview.png';
import RegisterComponent from "./RegisterComponent";
import { validateLogin } from "../services/apiService";
import { useNavigate } from "react-router-dom";


export default function LoginComponent(props) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  useEffect(() => {

  });

  async function handleLogin() {
    try {
      const user = await validateLogin(username, password);
      if (user) {
        if (user.type === 'manager') {
          navigate('/managerDashboard');
        } else if (user.type === 'candidate') {
          navigate('/candidateDashboard'); // Assuming you have this route for candidates
        } else {
          console.error("Unknown role:", user.type);
          alert("Unknown role, cannot navigate.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while trying to log in.");
    }
  }



  function registerClick() {

    props.setRegister(true);

  }



  return (
    <>

      <p style={{ fontSize: 30, fontFamily: 'sans-serif', textAlign: 'center' }}> Sign in with
        <i className="fab fa-google" style={{ fontSize: 30, marginLeft: 20, padding: 10 }}></i>
        <i className='fab fa-twitter' style={{ fontSize: 30, padding: 10 }}></i>
        <i className='fab fa-linkedin' style={{ fontSize: 30, padding: 10 }}></i>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #000' }} />
        <span style={{ padding: '0 10px', color: '#000', fontWeight: 'bold' }}>OR</span>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #000' }} />
      </div>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter your username.." />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password.." />
      </div>

      <button type="button" onClick={() => handleLogin()} className="btn btn-primary" style={{ marginBottom: 10 }}>Login</button>
      <p>New Customer? Register here.
        <button type="button" onClick={() => registerClick()} className="btn btn-secondary" style={{ marginBottom: 10, padding: 3, marginLeft: 10 }}>Register</button>

      </p>
    </>
  );
}
