import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) {
  try {
    const token = Cookies.get('token');

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }), 
      ...headers,
    };

    const options = {
      method,
      headers: defaultHeaders,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, options);
    console.log('this is resons', response);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || `Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
}
