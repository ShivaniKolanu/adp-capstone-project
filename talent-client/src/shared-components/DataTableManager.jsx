import React, { useState } from "react";
import '../styles/DataTable.css';

export default function DataTableManager(props) {
    const { jobs } = props;
    const [selectedJob, setSelectedJob] = useState(null);
    console.log(jobs);
    const handleStatusChange = (event) => {
        setSelectedJob({ ...selectedJob, listingstatus: event.target.value });
    };

    const handleShow = (job) => {
        setSelectedJob(job);
        const modal = new window.bootstrap.Modal(document.getElementById('jobModal'));
        modal.show();
    };

    return (
        <>
            <table className="table table-striped table-bordered" style={{ width: '100%', marginTop: 10 }}>
                <thead>
                    <tr>
                        <th scope="col">Department</th>
                        <th scope="col">Listing Title</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Listing Status</th>
                        <th scope="col">Date Listed</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                            <tr key={index} onClick={() => handleShow(job)} className="clickable-row">
                                <td>{job.department}</td>
                                <td>{job.listingTitle}</td>
                                <td>{job.jobtitle}</td>
                                <td style={{ color: job.listingstatus === 'active' ? 'green' : 'red' }}>
                                    {job.listingstatus}
                                </td>
                                <td>{new Date(job.dateListed).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>No jobs to display</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="jobModal" tabIndex="-1" aria-labelledby="jobModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="jobModalLabel">Job Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Tabs */}
                            <ul className="nav nav-tabs" id="jobTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="update-tab" data-bs-toggle="tab" href="#update" role="tab" aria-controls="active" aria-selected="true">Update Details</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="inactive-tab" data-bs-toggle="tab" href="#inactive" role="tab" aria-controls="inactive" aria-selected="false">Candidate Applications</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="jobTabContent">
                                <div className="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                                    {selectedJob && (
                                        <>
                                            {/* Active tab content */}
                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Department</label>
                                                    <input type="text" name="department" value={selectedJob.department} className="form-control" placeholder="Enter your department.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Listing Title</label>
                                                    <input type="text" name="listingTitle" value={selectedJob.listingTitle} className="form-control" placeholder="Enter Listing title.." />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Job Title</label>
                                                    <input type="text" name="jobTitle" value={selectedJob.jobtitle} className="form-control" placeholder="Enter Job title.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Date Listed</label>
                                                    <p><strong>{new Date(selectedJob.dateListed).toLocaleDateString()}</strong></p>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Job Description</label>
                                                <input type = "text"
                                                    name="jobDescription"
                                                    value={selectedJob.jobdescription}
                                                    className="form-control"
                                                    placeholder="Enter job description.."
                                                    rows="4"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Additional Information</label>
                                                <textarea
                                                    name="additionalInformation"
                                                    value={selectedJob.additionalinformation}
                                                    className="form-control"
                                                    placeholder="Enter additional information.."
                                                    rows="4"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <p><strong>Listing Status:</strong></p>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="listingstatus"
                                                            id="statusActive"
                                                            value="active"
                                                            checked={selectedJob.listingstatus === 'active'}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="statusActive">
                                                            Active
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="listingstatus"
                                                            id="statusInactive"
                                                            value="inactive"
                                                            checked={selectedJob.listingstatus === 'inactive'}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="statusInactive">
                                                            Inactive
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Date Closed</label>
                                                    <input type="date" name="dateClosed" value={selectedJob.dateClosed} className="form-control" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="tab-pane fade" id="inactive" role="tabpanel" aria-labelledby="inactive-tab">
                                    {/* Inactive tab content */}
                                    <p>No additional information available for inactive jobs.</p>
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
