import React, { useState } from "react";
import '../styles/header.css';
import { searchJobs } from "../services/apiService";

export default function Header() {

  const [searchJobParam, setSearchJobParam] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isSearchComplete, setIsSearchComplete] = useState(false);


  async function searchJobs() {
    try {
      console.log("Coming");
      const response = await fetch(`http://localhost:8080/api/jobs/search?job_title=${encodeURIComponent(searchJobParam)}`);
      if (!response.ok) {
        // Handle different HTTP status codes appropriately
        console.error('HTTP error', response.status, response.statusText);
        setIsSearchComplete(true);
        setJobs('');
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jobs = await response.json();
        console.log('Jobs found:', jobs);
        setJobs(jobs);
        // Handle the jobs data here, such as displaying it in the UI
      } else {
        console.error("Unexpected content-type:", contentType);
        const text = await response.text();
        console.log("Response body:", text);  // Log the unexpected HTML response for debugging
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setIsSearchComplete(true);
    }

  }

  async function handleSearchJobs() {
    try {
      const isSuccess = await searchJobs(searchJobParam);
      if (isSuccess) {
        // Handle successful login
      }
    } catch (err) {
      console.error('Error searching jobs:', error);
    }
    finally {
      setIsSearchComplete(true);
    }
  }

  function searchJobsClose() {
    setSearchJobParam('');
    setJobs([]);
    setIsSearchComplete(false);
  }



  return (
    <>
      <nav className="navbar">
        <h1 className="company-name">HireVista</h1>
        <ul className="navbar-list">
          {/* <li className="about"><a href="/about">About</a></li>
          <li className="profile"><a href="/profile">Profile</a></li> */}

        </ul>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
          Search for Jobs
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Search for Jobs</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => searchJobsClose()}></button>
              </div>
              <div className="modal-body" >
                <input type="text" name="searchJobParam" onChange={(e) => setSearchJobParam(e.target.value)} className="form-control" placeholder="Search for a job title.." />
                <br />
                <button type="button" onClick={() => handleSearchJobs()} className="btn btn-primary">Search</button>
                <br />
                <div className="job-cards-container" style={{ maxHeight: "45vh", overflowY: "auto", overflowX: "hidden", marginTop: 10 }}>
                  {isSearchComplete && jobs.length === 0 ? (
                    // <p>No jobs to display.</p>
                    <div class="alert alert-danger" role="alert">
                      No jobs to display.
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job.job_id} className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title">{job.listingTitle}</h5>
                            <span className={`badge ${job.listingstatus === 'active' ? 'bg-success' : 'bg-danger'}`}>
                              {job.listingstatus}
                            </span>
                          </div>
                          <h6 className="card-title">{job.jobtitle}</h6>
                          <p className="card-text">Department: {job.department}</p>
                          <p className="card-text">Job Description: {job.jobdescription}</p>
                          <p className="card-text">Additional information: {job.additionalinformation}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => searchJobsClose()}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};