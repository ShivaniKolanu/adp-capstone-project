import React, { useEffect, useState } from "react";


export default function RegisterComponent(props) {
    const [role, setRole] = useState('');

    function loginClick() {
        props.setRegister(false);
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
                    <input type="text" name="fullname" className="form-control" placeholder="Enter your full name.." />
                </div>
                <div className="flex-grow-1 ms-2">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter your email.." />
                </div>
            </div>

            {/* Fields placed side by side */}
            {
                role === 'candidate' && (
                    <>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="flex-grow-1 me-2">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" className="form-control" placeholder="Enter your address.." />
                            </div>
                            <div className="flex-grow-1 ms-2">
                                <label className="form-label">Phone</label>
                                <input type="text" name="phone" className="form-control" placeholder="Enter your phone.." />
                            </div>
                        </div>
                        <div className="mb-1">
                            <label className="form-label">Resume</label>
                            <input type="text" name="resume" className="form-control" placeholder="Enter your resume details.." />
                        </div>
                    </>

                )
            }

            {
                role === 'manager' && (

                    <div className="d-flex justify-content-between mb-1">
                        <div className="flex-grow-1 me-2">
                            <label className="form-label">Department</label>
                            <input type="text" name="department" className="form-control" placeholder="Enter your address.." />
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <label className="form-label">Phone</label>
                            <input type="text" name="phone" className="form-control" placeholder="Enter your phone.." />
                        </div>
                    </div>

                )
            }

            <div className="d-flex justify-content-between mb-1">
                <div className="flex-grow-1 me-2">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter your username.." />
                </div>
                <div className="flex-grow-1 ms-2">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter your password.." />
                </div>
            </div>

            <button type="button" className="btn btn-primary" style={{ marginBottom: 10 }}>Register</button>
            <p>Already have an account? Login here.
                <button type="button" onClick={() => loginClick()} className="btn btn-secondary" style={{ marginBottom: 10, padding: 3, marginLeft: 10 }}>Login</button>
            </p>
        </>
    );
}
