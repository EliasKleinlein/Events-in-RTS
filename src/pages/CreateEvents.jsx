import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router";

import { createEvent } from "../api/fetch";

const PickHandler = ({ onPick }) => {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const CreateEvents = () => {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    location: "",
    latitude: null,
    longitude: null,
    date: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePick = ({ lat, lng }) =>
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));

  const handleRemoveMarker = () =>
    setFormData((prev) => ({ ...prev, latitude: null, longitude: null }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.date ||
      !formData.description ||
      !formData.location ||
      !formData.title
    ) {
      setError("Please fill out all fields");
      return;
    }

    const formattedFormData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    try {
      setIsLoading(true);
      const data = await createEvent(formattedFormData);
      navigate(`/eventsdetails/${data.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-14">
      <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl">
        <fieldset className="fieldset rounded-box bg-base-200 p-6 shadow-xl sm:p-10">
          <legend className="fieldset-legend font-serif text-4xl font-semibold normal-case">
            Create New Event
          </legend>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="w-full">
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="input input-bordered bg-base-100 mb-3 w-full"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
              <label className="label" htmlFor="date">
                Date and Time
              </label>
              <input
                type="datetime-local"
                className="input input-bordered bg-base-100 mb-3 w-full"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
              <label className="label" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                className="input input-bordered bg-base-100 mb-3 w-full"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
              <MapContainer
                center={[0, 0]}
                zoom={0}
                className="rounded-box border-base-300 bg-base-200 h-64 w-full border"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PickHandler onPick={handlePick} />
                {formData.latitude != null && (
                  <Marker
                    position={{
                      lat: formData.latitude,
                      lng: formData.longitude,
                    }}
                  />
                )}
              </MapContainer>
              {formData.latitude != null && (
                <div className="mt-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <p className="text-base-content/70 text-sm">
                    Picked: {formData.latitude.toFixed(6)},{" "}
                    {formData.longitude.toFixed(6)}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveMarker}
                    className="btn btn-error btn-xs rounded-full"
                  >
                    Remove Marker
                  </button>
                </div>
              )}
            </div>
            <div className="flex min-h-72 flex-col">
              <label className="label" htmlFor="description">
                Description
              </label>
              <textarea
                className="textarea textarea-bordered bg-base-100 h-64 w-full grow lg:h-auto"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-6 rounded-full px-6 normal-case"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {error && (
            <div role="alert" className="alert alert-error alert-soft mt-4">
              <span>{error}</span>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default CreateEvents;
