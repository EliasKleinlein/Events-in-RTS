import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const EventMap = () => {
  const position = [52.500402, 13.446582];
  return (
    <div className="mx-auto w-full max-w-2xl py-8">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Hello World!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default EventMap;
