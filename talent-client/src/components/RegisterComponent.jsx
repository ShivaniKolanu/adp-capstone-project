import React, { useEffect, useState, useContext } from "react";
import { registerNewUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { GlobalUserContext } from "../App";

export default function RegisterComponent(props) {
    const {globalUser,setGlobalUser} = useContext(GlobalUserContext)
    const [role, setRole] = useState('');
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState('');
    const [department, setDepartment] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function loginClick() {
        props.setRegister(false);
    }

    async function handleRegister() {
        try {
            const commonData = { role, full_name, email, phone, username, password };
            const registrationData = role === 'candidate'
                ? { ...commonData, address, resume }
                : { ...commonData, department };

            console.log("Registration Data", registrationData);

            const result = await registerNewUser(registrationData);
            if (result.statusCode === 201) {
                console.log("Successful", result.message);
                console.log("Data:", result.data);
                setGlobalUser(result.data);
                if (role === 'candidate') {
                    navigate('/candidateDashboard');
                } else if (role === 'manager') {
                    navigate('/managerDashboard');
                }

            } else {
                console.error("Not Successful", result.message);
            }
        } catch (err) {
            console.error("Registration error:", err);
        }

    }



    return (
        <>
            <h2>Register</h2>
            <div className="mb-1">
                <label className="form-label">Role</label>
                <select name="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="select">Select an option</option>
                    <option value="manager">Manager</option>
                    <option value="candidate">Candidate</option>
                </select>
            </div>

            <div className="d-flex justify-content-between mb-1">
                <div className="flex-grow-1 me-2">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="full_name" value={full_name} onChange={(e) => setFullName(e.target.value)} className="form-control" placeholder="Enter your full name.." />
                </div>
                <div className="flex-grow-1 ms-2">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your email.." />
                </div>
            </div>

            {/* Fields placed side by side */}
            {
                role === 'candidate' && (
                    <>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="flex-grow-1 me-2">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter your address.." />
                            </div>
                            <div className="flex-grow-1 ms-2">
                                <label className="form-label">Phone</label>
                                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter your phone.." />
                            </div>
                        </div>
                        <div className="mb-1">
                            <label className="form-label">Resume</label>
                            <input type="text" name="resume" value={resume} onChange={(e) => setResume(e.target.value)} className="form-control" placeholder="Enter your resume details.." />
                        </div>
                    </>

                )
            }

            {
                role === 'manager' && (

                    <div className="d-flex justify-content-between mb-1">
                        <div className="flex-grow-1 me-2">
                            <label className="form-label">Department</label>
                            <input type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control" placeholder="Enter your address.." />
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <label className="form-label">Phone</label>
                            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter your phone.." />
                        </div>
                    </div>

                )
            }

            <div className="d-flex justify-content-between mb-1">
                <div className="flex-grow-1 me-2">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter your username.." />
                </div>
                <div className="flex-grow-1 ms-2">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password.." />
                </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={() => handleRegister()} style={{ marginBottom: 10 }}>Register</button>
            <p>Already have an account? Login here.
                <button type="button" onClick={() => loginClick()} className="btn btn-secondary" style={{ marginBottom: 10, padding: 3, marginLeft: 10 }}>Login</button>
            </p>
        </>
    );
}
