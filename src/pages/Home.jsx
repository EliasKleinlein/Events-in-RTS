import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getUpcomingEvents } from "../api/fetch";
import { DateIcon } from "../components/icons/DateIcon";

const placeholderImages = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
];

const CategoryIcon = ({ category }) => {
  const className = "size-4 shrink-0";

  if (category === "music") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          d="M9 18V5l10-2v13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    );
  }

  if (category === "food") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          d="M6 3v8M3.5 3v5a2.5 2.5 0 0 0 5 0V3M6 11v10M17 3v18M17 3c2 0 3.5 2 3.5 4.5S19 12 17 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path
        d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H13a1.5 1.5 0 0 1 0-3h1a4 4 0 0 0-2-11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="12" r=".7" fill="currentColor" />
      <circle cx="10" cy="8" r=".7" fill="currentColor" />
      <circle cx="14" cy="7" r=".7" fill="currentColor" />
    </svg>
  );
};

const Home = () => {
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
    return (
      <p className="text-base-content/70 py-20 text-center">
        Events werden geladen …
      </p>
    );
  }

  if (error) {
    return <p className="text-error py-20 text-center">{error}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-10 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-7">
          <div className="badge badge-primary badge-outline rounded-full">
            Discover. Plan. Experience.
          </div>
          <h1 className="max-w-xl font-serif text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Make plans worth keeping
          </h1>
          <p className="text-base-content/70 max-w-sm text-base leading-7">
            Discover culture. Share moments. Your city is full of things to
            live.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-lg gap-2 rounded-full">
              <DateIcon className="size-4" />
              Today
            </span>
            <span className="badge badge-outline badge-lg gap-2 rounded-full">
              <DateIcon className="size-4" />
              This Weekend
            </span>
            <span className="badge badge-outline badge-lg gap-2 rounded-full">
              <CategoryIcon category="music" />
              Music
            </span>
            <span className="badge badge-outline badge-lg gap-2 rounded-full">
              <CategoryIcon category="food" />
              Food
            </span>
            <span className="badge badge-outline badge-lg gap-2 rounded-full">
              <CategoryIcon category="arts" />
              Arts
            </span>
          </div>
        </div>

        <div className="rounded-box bg-base-200 relative grid grid-cols-2 gap-3 p-3 shadow-xl">
          <div className="bg-primary absolute top-0 right-0 h-32 w-32 translate-x-6 -translate-y-6 rounded-full sm:h-48 sm:w-48" />
          <img
            src={placeholderImages[1]}
            alt="People enjoying a concert"
            className="rounded-box relative col-span-2 h-44 w-full object-cover sm:h-52"
          />
          <img
            src={placeholderImages[2]}
            alt="Art exhibition"
            className="rounded-box relative h-40 w-full object-cover sm:h-52"
          />
          <img
            src={placeholderImages[3]}
            alt="Dinner with friends"
            className="rounded-box relative h-40 w-full object-cover sm:h-52"
          />
        </div>
      </section>

      <section className="card bg-primary text-primary-content lg:card-side mt-14 overflow-hidden shadow-xl">
        <figure className="min-h-64 basis-3/5">
          <img
            src={placeholderImages[0]}
            alt="Festival crowd"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body basis-2/5 justify-center p-8 sm:p-10">
          <div className="badge badge-outline border-primary-content text-primary-content">
            FEATURED
          </div>
          <h2 className="card-title mt-3 font-serif text-4xl leading-tight font-semibold">
            {events[0]?.title ?? "Your next great event"}
          </h2>
          <p className="text-primary-content/85">{events[0]?.location}</p>
          <p className="text-primary-content/85">
            {events[0]
              ? new Date(events[0].date).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Discover upcoming events"}
          </p>
          <div className="card-actions mt-4">
            <Link
              to={events[0] ? `/eventsdetails/${events[0].id}` : "/all-events"}
              className="btn bg-base-100 text-base-content rounded-full border-0 px-5"
            >
              View Event →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Upcoming Events
          </h2>
          <Link
            to="/all-events"
            className="btn btn-ghost btn-sm text-primary normal-case"
          >
            View all events →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                <h3 className="card-title font-serif text-xl font-semibold">
                  {event.title}
                </h3>
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
        </div>
      </section>

      <section className="hero rounded-box bg-primary text-primary-content mt-16 overflow-hidden shadow-xl">
        <div className="hero-content w-full justify-between gap-8 px-8 py-10 sm:px-14 sm:py-12">
          <div>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              Curated events. Real moments.
            </h2>
            <p className="text-primary-content/85 mt-2">
              Be the first to know about new events in your city.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline border-primary-content text-primary-content hover:border-base-100 hover:bg-base-100 hover:text-base-content rounded-full"
          >
            Get Notified
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
