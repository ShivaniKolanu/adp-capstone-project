// services/apiService.js
export async function validateLogin(username, password) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/byName/${username}`);

        if (response.ok) {
            const userData = await response.json();
            if (userData.password === password) {
                console.log("Login Successful");
                return userData;
            } else {
                console.log("Incorrect password");
                alert("Incorrect password!");
                return null;
            }
        } else {
            console.log(`User not found with username: ${username}`);
            return null;
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
