import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getAllEvents } from "../api/fetch";
import { NextArrowsIcon } from "../components/icons/NextArrowsIcon";
import { PreviousArrowsIcon } from "../components/icons/PreviousArrowsIcon";

const placeholderImages = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
];

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasPage, setHasPage] = useState({ next: false, previous: false });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllEvents(page);
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
    return (
      <p className="text-base-content/70 py-20 text-center">
        Events loading...
      </p>
    );
  }

  if (error) {
    return <p className="text-error py-20 text-center">{error}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-10 sm:py-14">
      <section className="mb-10 max-w-2xl">
        <div className="badge badge-primary badge-outline rounded-full">
          Explore the city
        </div>
        <h1 className="mt-4 font-serif text-5xl leading-tight font-semibold sm:text-6xl">
          All Events
        </h1>
        <p className="text-base-content/70 mt-4 text-base leading-7">
          Find your next memorable experience, one event at a time.
        </p>
      </section>

      <div className="join mb-8 flex justify-center">
        <button
          className="join-item btn rounded-l-full px-5"
          disabled={!hasPage.previous}
          onClick={() => setPage((p) => p - 1)}
        >
          <PreviousArrowsIcon />
        </button>
        <span className="join-item btn bg-base-100 pointer-events-none">
          Page {page}
        </span>
        <button
          className="join-item btn rounded-r-full px-5"
          disabled={!hasPage.next}
          onClick={() => setPage((p) => p + 1)}
        >
          <NextArrowsIcon />
        </button>
      </div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {events.map((event, index) => (
          <Link
            key={event.id}
            to={`/eventsdetails/${event.id}`}
            className="card card-side border-base-300 bg-base-200 overflow-hidden border shadow-sm transition-shadow hover:shadow-xl"
          >
            <figure className="w-32 shrink-0 sm:w-40">
              <img
                src={placeholderImages[index % placeholderImages.length]}
                alt="Event placeholder"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="card-body min-h-36 gap-2 p-4">
              <h2 className="card-title font-serif text-xl font-semibold">
                {event.title}
              </h2>
              <p className="text-base-content/70 text-sm">{event.location}</p>
              <p className="text-base-content/70 text-sm">
                {new Date(event.date).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </Link>
        ))}
      </section>
      <div className="join mt-8 flex justify-center">
        <button
          className="join-item btn rounded-l-full px-5"
          disabled={!hasPage.previous}
          onClick={() => setPage((p) => p - 1)}
        >
          <PreviousArrowsIcon />
        </button>
        <span className="join-item btn bg-base-100 pointer-events-none">
          Page {page}
        </span>
        <button
          className="join-item btn rounded-r-full px-5"
          disabled={!hasPage.next}
          onClick={() => setPage((p) => p + 1)}
        >
          <NextArrowsIcon />
        </button>
      </div>
    </div>
  );
};

export default AllEvents;
