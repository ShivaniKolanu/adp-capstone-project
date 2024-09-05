import React, { useState } from "react";
import { updateJobListing, updateApplicationStatus } from '../services/apiService';
import '../styles/DataTable.css';

export default function DataTableManager(props) {
    const { jobs, onJobsUpdate } = props;
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateMessage, setUpdateMessage] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState([]);


    const handleStatusChange = (event) => {
        setSelectedJob({ ...selectedJob, listingstatus: event.target.value });
    };

    const handleApplicationStatusChange = async (applicantId, newStatus) => {
        const response = await updateApplicationStatus(applicantId, newStatus);
        setUpdateMessage(response.message || "An error occurred while updating the application status.");

        if (response.statusCode === 200) {
            setTimeout(() => {
                setSuccessAlert(true);
              
                // Set success alert to false after 2 seconds
                setTimeout(() => {
                  setSuccessAlert(false);
                }, 2000); // 2000 milliseconds = 2 seconds
              
              }, 1000); 
            const updatedJobs = jobs.map(job => {
                if (job.jobId === selectedJob.jobId) {
                    return {
                        ...job,
                        applications: job.applications.map(application =>
                            application.applicationId === applicantId
                                ? { ...application, applicationStatus: newStatus }
                                : application
                        )
                    };
                }
                return job;
            });

            // Update the state with the updated jobs
            onJobsUpdate(updatedJobs);

            // Optionally, update the selected job's applications for the modal
            setSelectedApplications(updatedJobs.find(job => job.jobId === selectedJob.jobId).applications);  // You might want to refresh the job list to reflect the updated application status
        }
    };


    const handleShow = (job) => {
        setSuccessAlert(false);
        setSelectedJob(job);
        setFormData({
            ...job,
            jobId: job.jobId,
            managerId: job.managerId
        });
        setSelectedApplications(job.applications || []);
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
            setTimeout(() => {
                setSuccessAlert(true);
              
                // Set success alert to false after 2 seconds
                setTimeout(() => {
                  setSuccessAlert(false);
                }, 2000); // 2000 milliseconds = 2 seconds
              
              }, 1000);             
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

                                    {selectedApplications.length > 0 ? (
                                        <div className="accordion" id="accordionExample">
                                            {selectedApplications.map((application, index) => (
                                                <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header" id={`heading${index}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                                            Application {index + 1}
                                                        </button>

                                                    </h2>
                                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            {/* Display application details here */}
                                                            <p style={{ display: 'flex', alignItems: 'center' }}>
                                                                <strong style={{ marginRight: '10px' }}>Application Status</strong>
                                                                <select
                                                                    name="role"
                                                                    className="form-select"
                                                                    value={application.applicationStatus}
                                                                    onChange={(e) => handleApplicationStatusChange(application.applicationId, e.target.value)}
                                                                    style={{ width: 150 }}
                                                                >
                                                                    <option value="select">Select an option</option>
                                                                    <option value="pending">Pending</option>
                                                                    <option value="reviewed">Reviewed</option>
                                                                    <option value="accept">Accept</option>
                                                                    <option value="reject">Reject</option>
                                                                </select>
                                                            </p>

                                                            <p><strong>Full Name:</strong> {application.fullname}</p>
                                                            <p><strong>Email:</strong> {application.email}</p>
                                                            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                                                            <p><strong>Resume:</strong> {application.resume}</p>
                                                            <p><strong>Phone:</strong> {application.phone}</p>
                                                            <p><strong>Application Date:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>No applications to display</div>
                                    )}

                                    {/* <div class="accordion" id="accordionExample">
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
                                    </div> */}
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
