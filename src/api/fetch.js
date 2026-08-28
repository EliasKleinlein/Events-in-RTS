import { getToken } from "../utils/tokenStorage";

const API_URL = import.meta.env.VITE_API_URL;

const jsonOptions = (method, body) => {
  const token = getToken();
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  return options;
};

export const apiFetch = async (endpoint, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, options);
  } catch {
    throw new Error("API not reachable");
  }
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${data.error}`);
  }

  return data;
};

export const getUpcomingEvents = async () => {
  const data = await apiFetch(`/events/upcoming`);

  return data;
};
export const getAllEvents = async (page) => {
  const data = await apiFetch(`/events?page=${page}&limit=10`);

  return data;
};
export const getEventById = async (eventId) => {
  const data = await apiFetch(`/events/${eventId}`);

  return data;
};
export const registerUser = async (email, password) => {
  const data = await apiFetch(
    "/users",
    jsonOptions("POST", { email, password }),
  );

  return data;
};
export const loginUser = async (email, password) => {
  const data = await apiFetch(
    "/auth/login",
    jsonOptions("POST", { email, password }),
  );

  return data;
};
export const createEvent = async (eventData) => {
  const data = await apiFetch("/events", jsonOptions("POST", eventData));

  return data;
};
