export default class ApiError extends Error {
    constructor(message, status, endpoint) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.endpoint = endpoint;
    }
}