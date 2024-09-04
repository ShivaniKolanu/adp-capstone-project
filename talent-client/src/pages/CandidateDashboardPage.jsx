import React, { useContext, useEffect, useState } from "react";
import DoughnutChart from "../shared-components/DoughnutChart";
import DataTableCandidate from "../shared-components/DataTableCandidate";
import { GlobalUserContext } from "../App";
import { getApplicationsByUserId } from "../services/apiService";
import '../styles/CandidateDashboardPage.css';

export default function CandidateDashboardPage() {
    const { globalUser } = useContext(GlobalUserContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            if (globalUser && globalUser.data && globalUser.data.userId) {
                try {
                    const result = await getApplicationsByUserId(globalUser.data.userId);
                    if (result.statusCode === 200) {
                        setApplications(result.data);
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

        fetchApplications();
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
        <div className="candidateDashboard-parent">
            <h4>Candidate Dashboard Page</h4>
            <div className="candidate-chart">
                <DoughnutChart data={data} options={options} className="chart" />
            </div>

            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="candidate-applications-table">
                    <DataTableCandidate applications={applications} />
                </div>
            )}
        </div>
    );
}
