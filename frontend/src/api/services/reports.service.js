import ENV from "../../configs/env.config";
import ApiError from "./errors/api.error";

async function fetchData(endpoint, params = {}, method = "GET") {
    let url = `${ENV.BASE_URL}/${endpoint}`;

    if (method === "GET" && Object.keys(params).length > 0) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    const options = {
        method,
        headers: { "Content-Type": "application/json" },
    };

    if (method !== "GET")
        options.body = JSON.stringify(params);

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new ApiError(`API error`, response.status, endpoint);
    }

    return await response.json();
}

export const getSummary = (month, year) =>
    fetchData("/summary", { month, year });

export const getIndicators = (month, year) =>
    fetchData("/", { month, year });

export const getExpensesByCategory = () =>
    fetchData("/expenses/by-category");

export const getComparison = () => fetchData("/compare");