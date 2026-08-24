import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getEventById } from "../api/fetch";

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
    return <p className="text-center">Event wird geladen …</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="text-center">Event nicht gefunden.</p>;
  }

  return (
    <article className="card bg-base-100 mx-auto my-8 max-w-2xl shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-3xl">{event.title}</h1>
        {event.description && <p>{event.description}</p>}
        <p>{event.location}</p>
        <p>
          {new Date(event.date).toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
    </article>
  );
};

export default EventDetails;
