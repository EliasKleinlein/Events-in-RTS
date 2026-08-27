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
    <article className="card bg-base-200 mx-auto my-8 max-w-2xl shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-3xl">{event.title}</h1>
        {event.description && <p className="py-4">{event.description}</p>}
        <p>
          <DateIcon />
          {new Date(event.date).toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
        <p>
          <LocationIcon />
          {event.location}
        </p>
        {position[0] && position[1] && (
          <div className="py-2">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "200px", width: "100%", background: "#1a1a1a" }}
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
