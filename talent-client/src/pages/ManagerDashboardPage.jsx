import React, { useContext, useEffect, useState } from "react";
import DoughnutChart from "../shared-components/DoughnutChart";
import DataTableManager from "../shared-components/DataTableManager";
import { GlobalUserContext } from "../App";
import { getJobsByManagerId } from "../services/apiService";
import '../styles/ManagerDashboardPage.css';

export default function ManagerDashboardPage() {
    const { globalUser } = useContext(GlobalUserContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchJobs();
    }, [globalUser]); // Dependency array adjusted

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
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

            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="manager-job-listings-table">
                    <DataTableManager jobs={jobs} />
                </div>
            )}
        </div>
    );
}
