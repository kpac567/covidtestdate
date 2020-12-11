const executeApiCall = async (method, url, body) => {
    const payload = {};
    if (body) payload.body = body;

    const response = await fetch(url, {
        method,
        ...payload
    });

    return await response.json();
};

export default {
    post (url, payload) {
        return executeApiCall('POST', url, payload);
    }
};
