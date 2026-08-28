import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router";

import { getUpcomingEvents } from "../api/fetch";
import { ZoomToMarker } from "../components/ZoomToMarker";
import { DateIcon } from "../components/icons/DateIcon";
import { LocationIcon } from "../components/icons/LocationIcon";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const FitBounds = ({ events }) => {
  const map = useMap();

  useEffect(() => {
    if (events && events.length > 0) {
      const points = events.map((event) => [event.latitude, event.longitude]);

      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [5, 5], maxZoom: 15 });
    }
  }, [events, map]);
};

const EventMap = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);
  if (isLoading) {
    return <p className="text-center">Map is loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-8">
      <MapContainer
        style={{
          height: "80dvh",
          width: "100%",
          background: "var(--color-base-200)",
          border: "var(--color-base-300) 2px solid",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
          const position = [event.latitude, event.longitude];
          if (event.latitude && event.longitude) {
            return (
              <Marker key={event.id} position={position}>
                <Popup>
                  <div className="py-2 font-bold">{event.title}</div>
                  <div className="text-base-content/50 py-1">
                    <DateIcon className="text-primary inline pr-2" />
                    {new Date(event.date).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-base-content/50 py-1">
                    <ZoomToMarker position={position}>
                      <LocationIcon className="text-primary inline pr-2" />
                      {event.location}
                    </ZoomToMarker>
                  </div>
                  <div className="py-2">{event.description}</div>
                  <Link to={`/eventsdetails/${event.id}`}>
                    <span className="btn btn-xs btn-primary">Details</span>
                  </Link>
                </Popup>
              </Marker>
            );
          }
        })}
        <FitBounds events={events} />
      </MapContainer>
    </div>
  );
};

export default EventMap;
