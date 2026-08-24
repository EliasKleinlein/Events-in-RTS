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
    throw new Error("API nicht erreichbar.");
  }

  if (!response.ok) {
    throw new Error(`API-Fehler: ${response.status}`);
  }

  return response.json();
};

export const getEvents = async () => {
  const data = await apiFetch("/events?page=1&limit=10");

  return data.results;
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
