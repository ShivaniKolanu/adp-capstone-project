import React,  { useState } from "react";
import '../styles/header.css';
export default function Header() {

  const [searchJobParam, setSearchJobParam] = useState('');
  const [jobs, setJobs] = useState([]);


  async function searchJobs() {
    try {
      console.log("Coming");
      const response = await fetch(`http://localhost:8080/api/jobs/search?job_title=${encodeURIComponent(searchJobParam)}`);
      
      if (!response.ok) {
        // Handle different HTTP status codes appropriately
        console.error('HTTP error', response.status, response.statusText);
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
    }
  }
  


  return (
    <>
      <nav className="navbar">
        <h1 className="company-name">HireVista</h1>
        <ul className="navbar-list">
          {/* <li className="about"><a href="/about">About</a></li>
          <li className="profile"><a href="/profile">Profile</a></li> */}

        </ul>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Search for Jobs
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Search for Jobs</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type="text" name="searchJobParam" onChange={(e) => setSearchJobParam(e.target.value)} className="form-control" placeholder="Search for a job title.." />
                <br/>
                <button type="button" onClick={() => searchJobs()}  className="btn btn-primary">Search</button>

                <div className="job-cards-container">
        {jobs.map((job) => (
          <div key={job.job_id} className="card">
            <div className="card-body">
              <h5 className="card-title">{job.listingTitle}</h5>
              <h6 className="card-title">{job.jobtitle}</h6>
              <p className="card-text">Department: {job.department}</p>
              <p className="card-text">Job Description: {job.jobdescription}</p>
              <p className="card-text">Additional information: {job.additionalinformation}</p>
              <button className="btn btn-secondary">{job.listingstatus}</button>
            </div>
          </div>
        ))}
      </div>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};