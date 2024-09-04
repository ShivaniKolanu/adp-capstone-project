import React, { useState } from "react";
import '../styles/DataTable.css';

export default function DataTableCandidate(props) {
    const { applications } = props;
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [customResume, setCustomResume] = useState(null);
    console.log(applications);

    const handleStatusChange = (event) => {
        setSelectedApplication({ ...selectedApplication, listingstatus: event.target.value });
    };


    const handleShow = (application) => {
        setSelectedApplication(application);
        console.log(selectedApplication.applicationId);
        const modal = new window.bootstrap.Modal(document.getElementById('applicationModal'));
        modal.show();
    };

    return (
        <>
            <table className="table table-striped table-bordered" style={{ width: '100%', marginTop: 10 }}>
                <thead>
                    <tr>
                        <th scope="col">Application ID</th>
                        <th scope="col">Listing Title</th>
                        <th scope="col">Date Applied</th>
                        <th scope="col">Listing Status</th>
                        <th scope="col">Date Listed</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map((application, index) => (
                            <tr key={index} onClick={() => handleShow(application)} className="clickable-row">
                                <td>{application.applicationId}</td>
                                <td>{application.listingTitle}</td>
                                <td>{application.dateApplied}</td>
                                <td style={{ color: application.listingstatus === 'active' ? 'green' : 'red' }}>
                                    {application.listingstatus}
                                </td>
                                <td>{new Date(application.dateListed).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>No applications to display</td>
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
                                <div className="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                                    {selectedApplication && (
                                        <>
                                            {/* Active tab content */}
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="form-label"><strong>Application ID: </strong>{selectedApplication.applicationId}</label>
                                                {/* <input type="text" name="department" value={selectedApplication.applicationId} className="form-control" placeholder="Enter your department.." /> */}
                                            </div>
                                            {/* get job title */}
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="form-label"><strong>Application Title: </strong>{selectedApplication.listingTitle}</label>
                                                {/* <input type="text" name="listingTitle" value={selectedApplication.listingTitle} className="form-control" placeholder="Enter Listing title.." /> */}
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="form-label"><strong>Date Applied: </strong>{selectedApplication.dateApplied}</label>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                {/* add job description */}
                                                <label className="form-label"><strong>Application Description: </strong>{selectedApplication.description}</label>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="form-label"><strong>Cover Letter: </strong></label>
                                                <textarea
                                                    name="additionalInformation"
                                                    className="form-control"
                                                    placeholder="Enter cover letter info"
                                                    rows="4"
                                                    defaultValue={selectedApplication.coverLetter}
                                                    onChange={e => setCoverLetter(e.target.value)}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="form-label"><strong>Resume: </strong></label>
                                                <textarea
                                                    name="additionalInformation"
                                                    className="form-control"
                                                    placeholder="Enter resume info"
                                                    rows="4"
                                                    defaultValue={selectedApplication.customResume} 
                                                    onChange={e => setCustomResume(e.target.defaultValue)}
                                                />
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
