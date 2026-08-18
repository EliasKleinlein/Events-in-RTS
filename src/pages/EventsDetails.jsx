import { useParams } from "react-router";

const EventDetails = () => {
  const { eventid } = useParams();
  return <div>EventDetails!</div>;
};

export default EventDetails;
