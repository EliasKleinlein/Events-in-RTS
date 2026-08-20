import { useParams } from "react-router";

const EventDetails = () => {
  const { eventid } = useParams();
  return <div>EventsDetails!</div>;
};

export default EventDetails;
