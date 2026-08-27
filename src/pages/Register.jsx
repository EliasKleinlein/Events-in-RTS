import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../context/useAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email.trim(), password);
      navigate("/login");
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md px-5 py-12 sm:py-16">
      <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl">
        <fieldset className="fieldset gap-3 p-7 sm:p-10">
          <legend className="fieldset-legend font-serif text-4xl font-semibold normal-case">
            Create account
          </legend>

          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input input-bordered bg-base-100 w-full"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input input-bordered bg-base-100 w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label className="label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="input input-bordered bg-base-100 w-full"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error && (
            <p className="text-error mt-2" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary mt-5 w-full rounded-full normal-case"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
