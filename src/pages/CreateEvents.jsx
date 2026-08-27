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
    <div className="mx-auto max-w-6xl py-8">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box mx-4 border p-4 xl:mx-auto">
          <legend className="fieldset-legend text-xl">Create New Event</legend>
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div className="max-w-sm">
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="input mb-2 w-full"
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
                className="input mb-2 w-full"
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
                className="input mb-2 w-full"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
              <MapContainer
                center={[0, 0]}
                zoom={0}
                style={{
                  height: "256px",
                  width: "100%",
                  background: "var(--color-base-200)",
                  border: "var(--color-base-300) 2px solid",
                }}
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
                <div className="mt-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <p className="label">
                    Picked: {formData.latitude.toFixed(6)},{" "}
                    {formData.longitude.toFixed(6)}
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveMarker}
                    className="btn btn-error btn-xs max-w-fit"
                  >
                    Remove Marker
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 grow sm:mt-0 sm:pb-4">
              <label className="label" htmlFor="description">
                Description
              </label>
              <textarea
                className="textarea w-full sm:h-full"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-4" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {error && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{error}</span>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default CreateEvents;
