import React, { useEffect, useState } from "react";
import talent from '../assets/talent1-removebg-preview.png';

export default function LoginComponent() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

  });

  async function validateLogin() {

    try {
      const response = await fetch(`http://localhost:8080/api/users/byName/${username}`);

      if (response.ok) {
        const userData = await response.json();
        if (userData.password === password) {
          console.log("Login Successful");
          alert("Login successful!");
        } else {
          console.log("Incorrect password");
          alert("Incorrect password!");
        }
      } else {
        console.log(`User not found with username: ${username}`);
        alert(`User not found with username: ${username}`);
      }
    } catch (err) {
      setError("An error occurred while trying to log in.");
    }

  }
  


  return (
    <>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

        <div style={{ marginLeft: 50, float: 'left' }}>
          <img src={talent} alt="Talent" style={{ minWidth: 500, height: 'auto', borderRadius: 8 }} />
        </div>

        <div className="container" style={{ float: 'right', marginLeft: 200, backgroundColor: '#f2f2f2', borderRadius: 6, maxWidth: 500 }}>
          <p style={{ fontSize: 30, fontFamily: 'sans-serif' }}> Sign in with
            <i className="fab fa-google" style={{ fontSize: 30, marginLeft: 20, padding: 10 }}></i>
            <i className='fab fa-twitter' style={{ fontSize: 30, padding: 10 }}></i>
            <i className='fab fa-linkedin' style={{ fontSize: 30, padding: 10 }}></i>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #000' }} />
            <span style={{ padding: '0 10px', color: '#000', fontWeight: 'bold' }}>Or</span>
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

          <button type="button" onClick={() => validateLogin()}  className="btn btn-primary" style={{ marginBottom: 10 }}>Login</button>
          <p>New Customer? Register here.
            <button type="button" className="btn btn-secondary" style={{ marginBottom: 10, padding: 3, marginLeft: 10 }}>Register</button>

          </p>

        </div>

      </div>
    </>
  );
}
