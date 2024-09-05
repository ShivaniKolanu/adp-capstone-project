// services/apiService.js
export async function validateLogin(username, password, res) {
    try {
        const response = await fetch(`http://localhost:8080/api/login/byName/${username}`);

        if (response.ok) {
            const userData = await response.json();
            if (userData.password === password) {
                console.log("Login Successful");
                // return userData;
                return {
                    statusCode: 200,
                    message: `Successful`,
                    data: userData,
                };
            } else {
                console.log("Incorrect password");
                // alert("Incorrect password!");
                return {
                    statusCode: 401,
                    message: 'Incorrect Password',
                    data: null,
                };
            }
        } else {
            console.log(`User not found with username: ${username}`);
            return {
                statusCode: 404,
                message: 'User not found with given username',
                data: null,
            };
        }
    } catch (err) {
        console.error("An error occurred while trying to log in.", err);
        throw err;
    }
}


export async function searchJobs(searchJobParam) {
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
    }

}


export async function registerNewUser(data = {}) {

    try {

        const response = await fetch(`http://localhost:8080/api/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (response.ok) {
            return {
                statusCode: 201,
                message: 'User registered successfully.',
                data: responseData,
            };
        } else {
            return {
                statusCode: response.status,
                message: responseData?.message || 'Failed to register',
                data: responseData,
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            message: `Error: ${err.message}`,
            data: null,
        };
    }

}

export async function getJobsByManagerId(manager_id) {
    try {
        const response = await fetch(`http://localhost:8080/api/jobs/byManagerId/${manager_id}`);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (response.ok) {
            return {
                statusCode: 200,
                message: 'Found Jobs.',
                data: responseData,
            };
        } else {
            return {
                statusCode: response.status,
                message: responseData?.message || 'Failed to fetch managers',
                data: responseData,
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            message: `Error: ${err.message}`,
            data: null,
        };
    } 
    
}

export async function getApplicationsByUserId(user_id) {
    try {
        const response = await fetch(`http://localhost:8080/api/applications/byUserId/${user_id}`);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (response.ok) {
            return {
                statusCode: 200,
                message: 'Found Applications.',
                data: responseData,
            };
        } else {
            return {
                statusCode: response.status,
                message: responseData?.message || 'Failed to fetch applications.',
                data: responseData,
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            message: `Error: ${err.message}`,
            data: null,
        };
    } 
    
}

export async function addNewJobListing(data = {}) {

    try {

        console.log("Data", data);

        const response = await fetch('http://localhost:8080/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Repsonse is", response);

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (response.ok) {
            return {
                statusCode: 201,
                message: 'Job Listed successfully.',
                data: responseData,
            };
        } else {
            return {
                statusCode: response.status,
                message: responseData?.message || 'Failed to add the job',
                data: responseData,
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            message: `Error: ${err.message}`,
            data: null,
        };
    }

}



export async function updateJobListing(data = {}) {
    try {

        const jobs_id = data.jobId;

        const updateResponse = await fetch(`http://localhost:8080/api/jobs/${jobs_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to Update Job")
        }
        return {
            statusCode: 200,
            message: 'Job Updated successfully.',
            data: await updateResponse.json()
        };
    } catch (err) {
        return err.message;
    }

}


export async function getApplicationsByJobID(jobId) {
    try {
        const response = await fetch(`http://localhost:8080/api/appsNjobs/byJobId/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json'
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP Error : status: ${response.status}`)
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("GET request failed: ", error)
    }
}


export async function updateApplicationStatus(applicantId, applicationStatus) {
    try {

        const updateResponse = await fetch(`http://localhost:8080/api/applications/${applicantId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: applicationStatus
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to Update Application")
        }
        return {
            statusCode: 200,
            message: 'Application Updated successfully.',
            data: await updateResponse.json()
        };
    } catch (err) {
        return err.message;
    }

}

export async function addNewJobApplication(data = {}) {

    try {

        const response = await fetch('http://localhost:8080/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (response.ok) {
            return {
                statusCode: 201,
                message: 'Application added successfully.',
                data: responseData,
            };
        } else {
            return {
                statusCode: response.status,
                message: responseData?.message || 'Failed to add the application',
                data: responseData,
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            message: `Error: ${err.message}`,
            data: null,
        };
    }

}
