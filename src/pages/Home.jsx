import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getEvents } from "../api/fetch";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasPage, setHasPage] = useState({ next: false, previous: false });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents(page);
        setEvents(data.results);
        setHasPage({ next: data.hasNextPage, previous: data.hasPreviousPage });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [page]);
  if (isLoading) {
    return <p className="text-center">Events werden geladen …</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="join self-center py-8">
        <button
          className="join-item btn"
          disabled={!hasPage.previous}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous Page
        </button>
        <span className="join-item btn pointer-events-none">Page {page}</span>
        <button
          className="join-item btn"
          disabled={!hasPage.next}
          onClick={() => setPage((p) => p + 1)}
        >
          Next Page
        </button>
      </div>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/eventsdetails/${event.id}`}
            className="card bg-amber-900 shadow-xl transition-shadow hover:shadow-2xl"
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
      <div className="join self-center py-8">
        <button
          className="join-item btn"
          disabled={!hasPage.previous}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous Page
        </button>
        <span className="join-item btn pointer-events-none">Page {page}</span>
        <button
          className="join-item btn"
          disabled={!hasPage.next}
          onClick={() => setPage((p) => p + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Home;
