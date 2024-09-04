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

            <div style={{ justifyContent: 'right', display: 'flex' }}>

                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#JobCreateModal">Create a new Job Posting</button>

            </div>

            <div className="modal fade" id="JobCreateModal" tabIndex="-1" aria-labelledby="JobCreateModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="JobCreateModalLabel">Create a new Job Posting</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <div className="d-flex justify-content-between mb-1">
                                <div className="flex-grow-1 me-2">
                                    <label className="form-label">Department</label>
                                    <input type="text" name="department" className="form-control" placeholder="Enter department.." />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <label className="form-label">Listing Title</label>
                                    <input type="text" name="listingTitle" className="form-control" placeholder="Enter Listing title.." />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <div className="flex-grow-1 me-2">
                                    <label className="form-label">Job Title</label>
                                    <input type="text" name="jobTitle" className="form-control" placeholder="Enter Job title.." />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <label className="form-label">Job Description</label>
                                    <input
                                        type="text"
                                        name="jobDescription"
                                        className="form-control"
                                        placeholder="Enter Job Desc..." />
                                </div>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Additional Information</label>
                                <textarea
                                    name="additionalInformation"
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
                                        />
                                        <label className="form-check-label" htmlFor="statusInactive">
                                            Inactive
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <label className="form-label">Date Listed</label>
                                    <input
                                        type="date"
                                        disabled
                                        name="dateListed"
                                        className="form-control"
                                        value={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                            </div>

                            <div className="modal-footer d-flex justify-content-center mt-3">
                                <button type="button" className="btn btn-info">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
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
