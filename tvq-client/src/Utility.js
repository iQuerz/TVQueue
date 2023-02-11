class Utility {
    static handleResponse(response) {
        if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    //default verzija salje cookies kako treba
    static async fetchData(url, method = 'GET', body = null, headers = {}) {
        try {
        const response = await fetch(url, {
            credentials: 'include',
            method : method,
            headers: {
            'Content-Type': 'application/json',
            ...headers
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        });
        return await Utility.handleResponse(response);
        } catch (error) {
        console.error(error);
        }
    }
}
export default Utility