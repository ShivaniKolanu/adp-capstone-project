import React, { useContext, useEffect, useState } from "react";
import DoughnutChart from "../shared-components/DoughnutChart";
import DataTableManager from "../shared-components/DataTableManager";
import { GlobalUserContext } from "../App";
import { getJobsByManagerId } from "../services/apiService";
import '../styles/ManagerDashboardPage.css';
import ManagerJobCreateForm from "../components/ManagerJobCreateForm";

export default function ManagerDashboardPage() {
    const { globalUser } = useContext(GlobalUserContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        if (globalUser && globalUser.data && globalUser.data.managerId) {
            try {
                const result = await getJobsByManagerId(globalUser.data.managerId);
                if (result.statusCode === 200) {
                    setJobs(result.data);
                    console.log("Jobs set are", jobs);
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
    }, [globalUser]); // Dependency array adjusted
    const refreshJobs = () => {
        fetchJobs();
    };

    const data = {
        labels: [
            'Active Job Applications - Internal',
            'Active Job Applications - External',
            'Inactive Job Applications'
        ],
        datasets: [{
            label: 'Job Applications',
            data: [10, 10, 5], // 10 internal, 10 external, 5 inactive
            backgroundColor: [
                'rgb(255, 159, 64)',  // internal
                'rgb(255, 99, 132)',  // external
                'rgb(54, 162, 235)'   // inactive
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
        <div className="managerDashboard-parent">
            <h4>Manager Dashboard Page</h4>
            <div className="manager-chart">
                <DoughnutChart data={data} options={options} className="chart" />
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
