import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { getEvents } from "../api/fetch";
import { ZoomToMarker } from "../components/ZoomToMarker";
import { DateIcon } from "../components/icons/DateIcon";
import { LocationIcon } from "../components/icons/LocationIcon";

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
        const data = await getEvents();
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
        scrollWheelZoom={false}
        style={{ height: "80dvh", width: "100%", background: "#1a1a1a" }}
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
                    <DateIcon />
                    {new Date(event.date).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-base-content/50 py-1">
                    <ZoomToMarker position={position}>
                      <LocationIcon />
                      {event.location}
                    </ZoomToMarker>
                  </div>
                  <div className="py-2">{event.description}</div>
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
