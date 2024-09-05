import React, { useState, useContext } from "react";
import { GlobalUserContext } from "../App";
import { addNewJobApplication } from "../services/apiService";

export default function CandidateNewAppForm(props) {
    const { selectedJob, onAppsCreate } = props;
    const { globalUser } = useContext(GlobalUserContext);

    const [coverLetter, setCoverLetter] = useState('');
    const [customResume, setCustomResume] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    async function handleSubmitApp() {
        try {
            setSuccessAlert(false);
            const userId = globalUser.data.userId;
            const jobId = selectedJob.jobId;
            const applicationStatus = "pending";
            const data = { userId, jobId, coverLetter, customResume, applicationStatus };

            const result = await addNewJobApplication(data);
            if (result.statusCode === 201) {
                console.log("Successful", result.message);
                setTimeout(() => {
                    setSuccessAlert(true);

                    // Set success alert to false after 2 seconds
                    setTimeout(() => {
                        setSuccessAlert(false);
                    }, 2000); // 2000 milliseconds = 2 seconds

                }, 1000);
                setCoverLetter('');
                setCustomResume('');
                onAppsCreate();


            } else {
                console.error("Not Successful", result.message);
            }


        } catch (err) {

            console.error(" error:", err);

        }
    }

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{selectedJob.listingTitle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{selectedJob.jobtitle}</h6>
                    <p className="card-text">Department: {selectedJob.department}</p>
                    <p className="card-text">Job Description: {selectedJob.jobdescription}</p>
                    <div>
                        <label>Cover Letter</label>
                        <textarea className="form-control" name="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows="2"></textarea>
                    </div>

                    <div>
                        <label>Custom Resume</label>
                        <textarea className="form-control" name="customResume" value={customResume} onChange={(e) => setCustomResume(e.target.value)} rows="4"></textarea>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        <button className="btn btn-primary" onClick={() => handleSubmitApp()}>Submit Application</button>

                        <div className="flex-grow-1" style={{ marginLeft: '25%' }}>
                            <div className="d-flex align-items-center">
                                <label className="form-label me-2">Application Date:</label>
                                <input
                                    type="date"
                                    disabled
                                    name="dateListed"
                                    className="form-control"
                                    value={new Date().toISOString().split('T')[0]}
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>

                        </div>
                    </div>

                </div>
                {successAlert && <div className="alert alert-success" role="alert">
                    Application Created Successfully.
                </div>}
            </div>
        </div>
    );
}
