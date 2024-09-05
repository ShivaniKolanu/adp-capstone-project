import React from "react";

export default function CandidateNewAppForm({ selectedJob }) {
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
                        <textarea className="form-control" rows="2"></textarea>
                    </div>

                    <div>
                        <label>Custom Resume</label>
                        <textarea className="form-control" rows="4"></textarea>
                    </div>
                    <button className="btn btn-primary mt-3">Submit Application</button>
                </div>
            </div>
        </div>
    );
}
