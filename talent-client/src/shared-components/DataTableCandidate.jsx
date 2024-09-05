import React, { useState } from "react";
import '../styles/DataTable.css';
import { updateJobApplication } from "../services/apiService";

export default function DataTableCandidate(props) {
    const { applications, onAppsUpdate } = props;
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [customResume, setCustomResume] = useState(null);
    const [formData, setFormData] = useState({});
    const [successAlert, setSuccessAlert] = useState(false);


    const handleStatusChange = (event) => {
        setSelectedApplication({ ...selectedApplication, listingstatus: event.target.value });

    };


    const handleShow = (application) => {
        setSelectedApplication(application);
        setFormData({
            ...application,
            applicationId: application.applicationId,
            userId: application.userId,
            jobId: application.jobId
        });
        console.log(selectedApplication.applicationId);
        const modal = new window.bootstrap.Modal(document.getElementById('applicationModal'));
        modal.show();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {


        const response = await updateJobApplication(formData);

        if (response.statusCode === 200) {
            // Close the modal if update was successful
            setTimeout(() => {
                setSuccessAlert(true);
              
                // Set success alert to false after 2 seconds
                setTimeout(() => {
                  setSuccessAlert(false);
                }, 2000); // 2000 milliseconds = 2 seconds
              
              }, 1000); // 1000 milliseconds = 1 second
            onAppsUpdate();
        }
    };



    return (
        <>
            <table className="table table-striped table-bordered" style={{ width: '100%', marginTop: 10 }}>
                <thead>
                    <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Listing Title</th>
                        <th scope="col">Department</th>
                        <th scope="col">Cover Letter</th>
                        <th scope="col">Custom Resume</th>
                        <th scope="col">Date Applied</th>
                        <th scope="col">Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map((application, index) => (
                            <tr key={index} onClick={() => handleShow(application)} className="clickable-row">
                                <td>{application.jobtitle}</td>
                                <td>{application.listingTitle}</td>
                                <td>{application.department}</td>
                                <td>{application.coverLetter}</td>
                                <td>{application.customResume}</td>
                                {/* <td style={{ color: application.listingstatus === 'active' ? 'green' : 'red' }}>
                                    {application.listingstatus}
                                </td> */}
                                <td>{new Date(application.dateApplied).toLocaleDateString()}</td>
                                <td>{application.applicationStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No applications to display</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="applicationModal" tabIndex="-1" aria-labelledby="applicationModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="applicationModalLabel">Application Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Tabs */}
                            <ul className="nav nav-tabs" id="applicationTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="update-tab" data-bs-toggle="tab" href="#update" role="tab" aria-controls="active" aria-selected="true">Edit Application</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="applicationTabContent">
                                {successAlert && <div class="alert alert-success" role="alert">
                                    Application Updated Successfully.
                                </div>}
                                <div className="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                                    {selectedApplication && (
                                        <>
                                            {/* Active tab content */}


                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Listing Title</label>
                                                    <input type="text" name="listingTitle" disabled value={formData.listingTitle} onChange={handleChange} className="form-control" placeholder="Enter your department.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Job Title</label>
                                                    <input type="text" name="jobtitle" disabled value={formData.jobtitle} onChange={handleChange} className="form-control" placeholder="Enter Listing title.." />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Department</label>
                                                    <input type="text" name="department" disabled value={formData.department} onChange={handleChange} className="form-control" placeholder="Enter your department.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Job Description</label>
                                                    <input type="text" name="jobdescription" disabled value={formData.jobdescription} onChange={handleChange} className="form-control" placeholder="Enter Listing title.." />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Job Status</label>
                                                    <input type="text" name="department" disabled value={formData.listingstatus} onChange={handleChange} className="form-control" placeholder="Enter your department.." style={{ color: formData.listingstatus === 'active' ? 'green' : 'red' }} />
                                                </div>

                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Application Status</label>
                                                    <input type="text" name="applicationStatus" disabled style={{ color: formData.applicationStatus === 'reject' ? 'red' : 'blue' }} className="form-control" onChange={handleChange} value={formData.applicationStatus} />
                                                </div>
                                                <br />
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                                <label className="form-label">Cover Letter</label>
                                                <textarea className="form-control" name="coverLetter" value={formData.coverLetter} rows="2" onChange={handleChange}></textarea>
                                            </div>

                                            <div className="flex-grow-1 ms-2">
                                                <label className="form-label">Custom Resume</label>
                                                <textarea className="form-control" name="customResume" value={formData.customResume} rows="3" onChange={handleChange}></textarea>
                                            </div>


                                        </>
                                    )}
                                </div>
                                <div className="tab-pane fade" id="inactive" role="tabpanel" aria-labelledby="inactive-tab">
                                    {/* Inactive tab content */}
                                    <p>No additional information available for inactive applications.</p>
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
        </>
    );
}
