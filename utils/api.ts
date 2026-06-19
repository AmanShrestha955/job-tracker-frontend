import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export default api;
