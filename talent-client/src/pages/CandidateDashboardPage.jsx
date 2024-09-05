import React, { useContext, useEffect, useState } from "react";
import DoughnutChart from "../shared-components/DoughnutChart";
import DataTableCandidate from "../shared-components/DataTableCandidate";
import { GlobalUserContext } from "../App";
import { getAllJobs, getApplicationsByUserId, getCandidate } from "../services/apiService";
import '../styles/CandidateDashboardPage.css';
import CandidateSearchJobs from "../components/CandidateSearchJobs";
import UserProfile from "../components/UserProfile";

export default function CandidateDashboardPage() {
    const { globalUser } = useContext(GlobalUserContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allJobs, setAllJobs] = useState([]);
    const [completeApplicationsData, setCompleteApplicationsData] = useState([]);
    const [userData, setUserData] = useState([]);

    const userDataFetch = async () => {

        try {
            const result = await getCandidate(globalUser.data.candidateId);
            console.log("User data", result);
            setUserData(result);

        } catch(err){
            console.error(err);
        }
    };

    const fetchApplications = async () => {
        if (globalUser && globalUser.data && globalUser.data.userId) {
            try {
                const result = await getApplicationsByUserId(globalUser.data.userId);
                if (result.statusCode === 200) {
                    setApplications(result.data);
                    const allJobs = await getAllJobs();
                    setAllJobs(allJobs);

                    const jobMap = new Map();
                    allJobs.forEach(job => {
                        jobMap.set(job.jobId, job);
                    });

                    console.log("Jobmap", jobMap);

                    // Combine application data with job data
                    const combinedData = result.data.map(app => {
                        console.log("app", app);
                        const job = jobMap.get(app.jobId);
                        return {
                            ...app,
                            ...job
                        };
                    });

                    console.log("Combine Data is",combinedData);
                    setCompleteApplicationsData(combinedData);

                    console.log("applications set are", applications);
                } else {
                    console.error(`Error fetching applications: ${result.message}`);
                }
            } catch (err) {
                console.error("Error fetching applications:", err);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    useEffect(() => {
       

        fetchApplications();
        userDataFetch();
    }, [globalUser]); // Dependency array adjusted

    const refreshApps = () => {
        fetchApplications();
    }

    const data = {
        labels: [
            'Pending',
            'Reviewed',
            'Accepted',
            'Rejected'
        ],
        datasets: [{
            label: 'Job Applications',
            data: [8, 1, 3, 12], // 10 internal, 10 external, 5 inactive
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
                align: 'center',
            }
        }
    };

    return (

        
        <div className="candidateDashboard-parent">
            
            {/* Flex container for 3 divs */}
            <div className="dashboard-flex-container">
                {/* Left div */}
                <div className="left-side-div" style={{marginLeft:60, marginTop: 150}}>
                    <h1 style={{fontFamily: "'Courier New', Courier, monospace"}}>Candidate <br/> View</h1>
                </div>

                {/* Middle div: Doughnut chart */}
                <div className="candidate-chart middle-div" style={{marginLeft:200}}>
                    <DoughnutChart data={data} options={options} className="chart" />
                </div>

                {/* Right div */}
                <div className="right-side-div" style={{backgroundColor: 'white'}}>
                <UserProfile userData={userData} />               
                 </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="alert alert-info" role="alert" style={{ padding: 5 }}>
                    Click on a row in order to view/edit job application.
                </div>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchJobModal" style={{ padding: 0 }}>Apply for a Job</button>

            </div>

            <div className="modal fade" id="searchJobModal" tabIndex="-1" aria-labelledby="searchJobModalLabel" aria-hidden="true" >
                <CandidateSearchJobs onAppsCreate={refreshApps} />
            </div>

            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="candidate-applications-table">
                    <DataTableCandidate applications={completeApplicationsData} onAppsUpdate={refreshApps} />
                </div>
            )}
        </div>
    );
}
