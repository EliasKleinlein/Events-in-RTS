import { useState } from "react";

const CreateEvents = () => {
  const initialState = {
    title: "",
    description: "",
    location: "",
    date: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: API POST
    console.log("Form submitted with:", formData);
  };

  return (
    <div className="mx-auto max-w-sm py-8">
      <h2>Create a new Event</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend"></legend>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="input"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            className="input"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            className="input"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
          />
          <label className="label" htmlFor="date">
            Date and Time
          </label>
          <input
            type="datetime-local"
            className="input"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
          <button className="btn btn-neutral mt-4">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateEvents;
