import { useState, useEffect } from "react";
import { updateManager } from "../services/apiService";


export default function ManagerProfile(props){

    const { userData } = props;
    const [formData, setFormData] = useState({});
    const [successAlert, setSuccessAlert] = useState(false);
    useEffect(() => {
        if (userData) {
            setFormData({
                full_name: userData.fullname || '',
                email: userData.email || '',
                department: userData.department || '',
                phone: userData.phone || ''
            });
        }
    }, [userData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        const userId = userData.userId;
        const managerId = userData.managerId;
        const data = {...formData, userId, managerId};

        const response = await updateManager(data);

        if (response.statusCode === 200) {
            // Close the modal if update was successful
            setTimeout(() => {
                setSuccessAlert(true);
              
                // Set success alert to false after 2 seconds
                setTimeout(() => {
                  setSuccessAlert(false);
                }, 2000); // 2000 milliseconds = 2 seconds
              
              }, 1000); // 1000 milliseconds = 1 second
        }
    }

    return (
       

        <div className="container" style={{ marginLeft: 100, borderRadius: 6, maxWidth: 500, marginTop: 70 }}>

            <img src="https://randomuser.me/api/portraits/lego/5.jpg" style={{ maxWidth: 100 }} />
            <h5 style={{ fontFamily: "'Courier New', Courier, monospace" }}>Welcome, <br />{userData.fullname}</h5>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">Update Profile</button>

            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="userModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => searchJobsClose()}></button>
                        </div>
                        <div className="modal-body" >
                        {successAlert && <div class="alert alert-success" role="alert">
                                    Profile Updated Successfully.
                                </div>}
                            <div className="d-flex justify-content-between mb-1">
                                <div className="flex-grow-1 me-2">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="form-control" placeholder="Enter your department.." />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <label className="form-label">Email</label>
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter Listing title.." />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <div className="flex-grow-1 me-2">
                                    <label className="form-label">Department</label>
                                    <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" placeholder="Enter your department.." />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <label className="form-label">Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter Listing title.." />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
 
    );
}