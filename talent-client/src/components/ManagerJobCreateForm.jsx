import { useState, useContext } from "react";
import { GlobalUserContext } from "../App";
import { addNewJobListing } from "../services/apiService";


export default function ManagerJobCreateForm(props) {
    const {onJobsCreate} = props;
    const { globalUser } = useContext(GlobalUserContext);

    const [department, setDepartment] = useState('');
    const [listingTitle, setListingTitle] = useState('');
    const [jobtitle, setjobTitle] = useState('');
    const [jobdescription, setJobDescription] = useState('');
    const [additionalinformation, setAdditionalInformation] = useState('');
    const [listingstatus, setListingStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState(null); // To store the response message
    const [successAlert, setSuccessAlert] = useState(false);


    const handleSubmit = async () => {
        const newJobData = {
            department,
            listingTitle,
            jobtitle,
            jobdescription,
            additionalinformation,
            listingstatus ,
            managerId: globalUser.data.managerId,
        };

        console.log("New Job Data", newJobData);

        const response = await addNewJobListing(newJobData);

        // Handle the response
        setResponseMessage(response.message);

        if (response.statusCode === 201) {
            // Clear the form on successful submission
            setDepartment('');
            setListingTitle('');
            setjobTitle('');
            setJobDescription('');
            setAdditionalInformation('');
            setListingStatus('');
            setTimeout(() => {
                setSuccessAlert(true);
              
                // Set success alert to false after 2 seconds
                setTimeout(() => {
                  setSuccessAlert(false);
                }, 2000); // 2000 milliseconds = 2 seconds
              
              }, 1000); 
            onJobsCreate();
        }
    };


    return (
        <div className="modal-dialog modal-lg">
            <div className="modal-content" >
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="JobCreateModalLabel">Create a new Job Posting</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" >
                { successAlert && <div class="alert alert-success" role="alert">
                     Job Created Successfully.
                    </div>}
                    <div className="d-flex justify-content-between mb-1">
                        <div className="flex-grow-1 me-2">
                            <label className="form-label">Department</label>
                            <input type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control" placeholder="Enter department.." />
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <label className="form-label">Listing Title</label>
                            <input type="text" name="listingTitle" value={listingTitle} onChange={(e) => setListingTitle(e.target.value)} className="form-control" placeholder="Enter Listing title.." />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="flex-grow-1 me-2">
                            <label className="form-label">Job Title</label>
                            <input type="text" name="jobtitle" value={jobtitle} onChange={(e) => setjobTitle(e.target.value)} className="form-control" placeholder="Enter Job title.." />
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <label className="form-label">Job Description</label>
                            <input
                                type="text"
                                name="jobdescription"
                                className="form-control"
                                placeholder="Enter Job Desc..."
                                value={jobdescription} onChange={(e) => setJobDescription(e.target.value)} />
                                
                        </div>

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Additional Information</label>
                        <textarea
                            name="additionalinformation"
                            className="form-control"
                            placeholder="Enter additional information.."
                            rows="4"
                            value={additionalinformation} onChange={(e) => setAdditionalInformation(e.target.value)}
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
                                    checked={listingstatus === 'active'}
                                    onChange={(e) => setListingStatus(e.target.value)}
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
                                    checked={listingstatus === 'inactive'}
                                    onChange={(e) => setListingStatus(e.target.value)}
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
                        <button type="button" onClick={() => handleSubmit()} className="btn btn-info">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}