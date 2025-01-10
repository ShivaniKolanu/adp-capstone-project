import React, { useContext, useEffect, useState } from "react";
import DoughnutChart from "../shared-components/DoughnutChart";
import DataTableManager from "../shared-components/DataTableManager";
import { GlobalUserContext } from "../App";
import { getJobsByManagerId, getApplicationsByJobID, getManager } from "../services/apiService";
import '../styles/ManagerDashboardPage.css';
import ManagerJobCreateForm from "../components/ManagerJobCreateForm";
import ManagerProfile from "../components/ManagerProfile";

export default function ManagerDashboardPage() {
    const { globalUser } = useContext(GlobalUserContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [pending, setPending] = useState(0);
    const [reviewed, setReviewed] = useState(0);
    const [accept, setAccept] = useState(0);
    const [reject, setReject] = useState(0);

    const userDataFetch = async () => {

        try {
            const result = await getManager(globalUser.data.managerId);
            console.log("User data", result);
            setUserData(result);

        } catch(err){
            console.error(err);
        }
    };
    
    const fetchJobs = async () => {
        if (globalUser && globalUser.data && globalUser.data.managerId) {
            try {
                const result = await getJobsByManagerId(globalUser.data.managerId);
                if (result.statusCode === 200) {
                    setJobs(result.data);
                    // Fetch applications for each job
                const applicationsPromises = result.data.map(job => getApplicationsByJobID(job.jobId));
                const applicationsResults = await Promise.all(applicationsPromises);
                // Merge applications with their respective jobs
                // const jobsWithApplications = result.data.map((job, index) => ({
                //     ...job,
                //     applications: applicationsResults[index]
                // }));

                const statusCounts = { pending: 0, reviewed: 0, accept: 0, reject: 0 };
                const jobsWithApplications = result.data.map((job, index) => {
                    const applications = applicationsResults[index];

                    // Count the statuses
                    applications?.forEach((app) => {
                        const { applicationStatus } = app;
                        statusCounts[applicationStatus] = (statusCounts[applicationStatus] || 0) + 1;   
                    });

                    return {
                        ...job,
                        applications,
                        statusCounts, 
                    };
                });
                setJobs(jobsWithApplications);
                setPending(jobsWithApplications[0].statusCounts.pending);
                setReviewed(jobsWithApplications[0].statusCounts.reviewed);
                setAccept(jobsWithApplications[0].statusCounts.accept);
                setReject(jobsWithApplications[0].statusCounts.reject);



                console.log("Jobs with applications are", jobsWithApplications);
                } else {
                    console.error(`Error fetching jobs: ${result.message}`);
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {        

        fetchJobs();
        userDataFetch();
    }, [globalUser]); // Dependency array adjusted
    const refreshJobs = () => {
        fetchJobs();
    };

    const data = {
        labels: [
            'Pending',
            'Reviewed',
            'Accepted',
            'Rejected'
        ],
        datasets: [{
            label: 'Job Applications',
            data: [pending, reviewed, accept, reject], // 10 internal, 10 external, 5 inactive
            backgroundColor: [
                'rgb(255, 159, 64)',  // internal
                'rgb(184, 216, 190)',  // external
                'rgb(54, 162, 235)',   // inactive
                'rgb(255, 99, 132)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                // align: 'right',
            }
        }
    };


    return (
        <div className="managerDashboard-parent">
            {/* <h4>Manager Dashboard Page</h4> */}
            {/* <div className="manager-chart">
                <DoughnutChart data={data} options={options} className="chart" />
            </div> */}
<div className="dashboard-flex-container">
                {/* Left div */}
                <div className="left-side-div" style={{marginLeft:60, marginTop: 100}}>
                    <h1 style={{fontFamily: "'Courier New', Courier, monospace"}}>Hiring <br/> Manager <br/> View</h1>
                </div>

                {/* Middle div: Doughnut chart */}
                <div className="candidate-chart middle-div" style={{marginLeft:200}}>
                    <DoughnutChart data={data} options={options} className="chart" />
                </div>

                {/* Right div */}
                <div className="right-side-div" style={{backgroundColor: 'white'}}>
                {/* <UserProfile userData={userData} /> 
                               */}
                    <ManagerProfile userData={userData}/>
                 </div>
            </div>
            

            <div style={{  display: 'flex', justifyContent: 'space-between' }}>
            <div class="alert alert-info" role="alert" style={{padding: 5}}>
                Click on a row in order to view/edit job posting & view candidate applications.
            </div>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#JobCreateModal" style={{padding: 0}}>Create a new Job Posting</button>

            </div>

            <div className="modal fade" id="JobCreateModal" tabIndex="-1" aria-labelledby="JobCreateModalLabel" aria-hidden="true" >
                <ManagerJobCreateForm onJobsCreate={refreshJobs}/>
            </div>


            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="manager-job-listings-table">
                    <DataTableManager jobs={jobs} onJobsUpdate={refreshJobs}/>
                </div>
            )}
        </div>
    );
}
