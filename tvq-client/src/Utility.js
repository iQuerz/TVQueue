class Utility {
    static handleResponse(response) {
        if (!response.ok) {
            return response;
        }
        return response.json();
    }

    //default verzija salje cookies kako treba
    static async fetchData(url, method = 'GET', body = null, headers = {}) {
        let response = "";
        try {
        response = await fetch(url, {
            credentials: 'include',
            method : method,
            headers: {
            'Content-Type': 'application/json',
            ...headers
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        });
        } catch (error) {
        console.error(error);
        }
        return await Utility.handleResponse(response);
    }
}
export default Utility