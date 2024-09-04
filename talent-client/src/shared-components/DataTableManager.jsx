import React, { useState } from "react";
import { updateJobListing } from '../services/apiService';
import '../styles/DataTable.css';

export default function DataTableManager(props) {
    const { jobs, onJobsUpdate } = props;
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateMessage, setUpdateMessage] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const handleStatusChange = (event) => {
        setSelectedJob({ ...selectedJob, listingstatus: event.target.value });
    };

    const handleShow = (job) => {
        setSuccessAlert(false);
        setSelectedJob(job);
        setFormData({
            ...job,
            jobId: job.jobId,
            managerId: job.managerId
        });
        const modal = new window.bootstrap.Modal(document.getElementById('jobModal'));
        modal.show();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {

        console.log("Form Data is ", formData);

        const response = await updateJobListing(formData);
        setUpdateMessage(response.message || "An error occurred while updating the job.");

        if (response.statusCode === 200) {
            // Close the modal if update was successful
            setSuccessAlert(true);
            onJobsUpdate(); 
        }
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
                            <tr key={index} onClick={() => handleShow(job)} className="clickable-row" data-toggle="tooltip" data-placement="top" title="Click on a row in order to view/edit job posting & view candidate applications.!">
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
                            <td colSpan="5" style={{ textAlign: 'center' }}>No jobs to display</td>
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
                                {successAlert && <div class="alert alert-success" role="alert">
                                    Job Updated Successfully.
                                </div>}
                                <div className="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                                    {selectedJob && (
                                        <>
                                            {/* Active tab content */}
                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Department</label>
                                                    <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" placeholder="Enter your department.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Listing Title</label>
                                                    <input type="text" name="listingTitle" value={formData.listingTitle} onChange={handleChange} className="form-control" placeholder="Enter Listing title.." />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-1">
                                                <div className="flex-grow-1 me-2">
                                                    <label className="form-label">Job Title</label>
                                                    <input type="text" name="jobtitle" value={formData.jobtitle} onChange={handleChange} className="form-control" placeholder="Enter Job title.." />
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Date Listed</label>
                                                    <p><strong>{new Date(formData.dateListed).toLocaleDateString()}</strong></p>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Job Description</label>
                                                <input type="text"
                                                    name="jobdescription"
                                                    value={formData.jobdescription}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter job description.."
                                                    rows="4"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Additional Information</label>
                                                <textarea
                                                    name="additionalinformation"
                                                    value={formData.additionalinformation}
                                                    onChange={handleChange}
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
                                                            checked={formData.listingstatus === 'active'}
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
                                                            checked={formData.listingstatus === 'inactive'}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="statusInactive">
                                                            Inactive
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    <label className="form-label">Date Closed</label>
                                                    <input type="date" name="dateClosed" value={formData.dateClosed} onChange={handleChange} className="form-control" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="tab-pane fade" id="inactive" role="tabpanel" aria-labelledby="inactive-tab">
                                    {/* Candidate Applications content */}
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    Accordion Item #1
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Accordion Item #2
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingThree">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Accordion Item #3
                                                </button>
                                            </h2>
                                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
