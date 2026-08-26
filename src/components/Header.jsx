import { Link } from "react-router";

import { useAuth } from "../context/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Event Scheduler</a>
        </div>
        <div className="navbar-end gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/createevents" className="btn btn-primary">
                Create Event
              </Link>
              <button type="button" onClick={logout} className="btn btn-ghost">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
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
