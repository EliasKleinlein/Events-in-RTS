import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router";

import { getEventById } from "../api/fetch";
import { DateIcon } from "../components/icons/DateIcon";
import { LocationIcon } from "../components/icons/LocationIcon";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

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
    return (
      <p className="text-base-content/70 py-20 text-center">Loading Event...</p>
    );
  }

  if (error) {
    return <p className="text-error py-20 text-center">{error}</p>;
  }

  if (!event) {
    return <p className="text-error py-20 text-center">Event not found.</p>;
  }

  const position = [event.latitude, event.longitude];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-10 sm:py-14">
      <article className="card bg-base-200 overflow-hidden shadow-xl">
        <figure className="h-64 sm:h-80">
          <img
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80"
            alt="Event atmosphere"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body gap-8 p-6 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-2xl">
              <div className="badge badge-primary badge-outline rounded-full">
                Upcoming Event
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                {event.title}
              </h1>
              {event.description && (
                <p className="text-base-content/70 mt-6 leading-7">
                  {event.description}
                </p>
              )}
              <div className="mt-6 space-y-3">
                <p className="text-base-content/70 flex items-center gap-2">
                  <DateIcon className="text-primary" />
                  {new Date(event.date).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-base-content/70 flex items-center gap-2">
                  <LocationIcon className="text-primary" />
                  {event.location}
                </p>
              </div>
            </div>
            <div className="card-actions shrink-0 gap-3 lg:flex-col lg:items-end lg:justify-between">
              <button
                className="btn btn-primary btn-circle"
                aria-label="Add event"
              >
                +
              </button>
              <button className="btn btn-accent rounded-full px-6 normal-case">
                Buy Tickets
              </button>
            </div>
          </div>

          {position[0] && position[1] && (
            <div className="rounded-box border-base-300 overflow-hidden border">
              <MapContainer
                center={position}
                zoom={13}
                className="bg-base-200 h-52 w-full"
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
    </div>
  );
};

export default EventDetails;
