import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getEvents } from "../api/fetch";

const Home = () => {
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
    return <p className="text-center">Events werden geladen …</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/eventsdetails/${event.id}`}
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <p>{event.location}</p>
            <p>
              {new Date(event.date).toLocaleString("de-DE", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Home;
