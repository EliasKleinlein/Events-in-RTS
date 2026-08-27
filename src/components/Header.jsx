import { Link } from "react-router";

import { useAuth } from "../context/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="border-b border-base-300">
      <div className="navbar min-h-18 bg-transparent px-4 sm:px-10">
        <div className="navbar-start gap-1">
          <Link to="/" className="btn btn-ghost btn-sm px-2 font-medium normal-case">
            Home
          </Link>
          <Link to="/all-events" className="btn btn-ghost btn-sm px-2 font-medium normal-case">
            All Events
          </Link>
          <Link to="/map" className="btn btn-ghost btn-sm px-2 font-medium normal-case">
            Map
          </Link>
        </div>
        <div className="navbar-center">
          <span className="font-serif text-xl font-semibold sm:text-2xl">
            Event Scheduler
          </span>
        </div>
        <div className="navbar-end gap-1 sm:gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/createevents" className="btn btn-primary btn-sm rounded-full px-4 normal-case sm:px-5">
                Create Event
              </Link>
              <button type="button" onClick={logout} className="btn btn-ghost btn-sm rounded-full px-3 normal-case sm:px-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm rounded-full px-3 normal-case sm:px-4">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm rounded-full px-4 normal-case sm:px-5">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
