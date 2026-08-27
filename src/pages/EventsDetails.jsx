import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router";

import { getEventById } from "../api/fetch";
import { DateIcon } from "../components/icons/DateIcon";
import { LocationIcon } from "../components/icons/LocationIcon";

const EventDetails = () => {
  const { eventid } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await getEventById(eventid);
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [eventid]);
  if (isLoading) {
    return <p className="text-center">Loading Event...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="text-center">Event not found.</p>;
  }

  const position = [event.latitude, event.longitude];

  return (
    <article className="card bg-base-200 mx-4 my-8 max-w-2xl shadow-xl sm:mx-auto">
      <div className="card-body">
        <div className="flex flex-col gap-6 sm:flex-row lg:items-stretch lg:justify-between">
          <div className="flex-1">
            <h1 className="card-title text-3xl">{event.title}</h1>
            {event.description && <p className="py-4">{event.description}</p>}
            <p className="text-base-content/50">
              <DateIcon className="text-primary inline pr-2" />
              {new Date(event.date).toLocaleString("de-DE", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p className="text-base-content/50">
              <LocationIcon className="text-primary inline pr-2" />
              {event.location}
            </p>
          </div>
          <div className="flex flex-row items-end gap-3 sm:flex-col sm:justify-between">
            <button className="btn btn-primary w-10">+</button>
            <button className="btn btn-accent w-30">Buy Tickets</button>
          </div>
        </div>

        {position[0] && position[1] && (
          <div className="py-2">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{
                height: "200px",
                width: "100%",
                background: "var(--color-base-200)",
                border: "var(--color-base-300) 2px solid",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} />
            </MapContainer>
          </div>
        )}
      </div>
    </article>
  );
};

export default EventDetails;
