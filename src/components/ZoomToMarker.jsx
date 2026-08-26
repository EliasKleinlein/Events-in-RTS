import { useMap } from "react-leaflet";

const ZoomToMarker = ({ children, position }) => {
  const map = useMap();

  const handleClick = () => {
    map.setView(position, 15, {
      animate: true,
      duration: 1.0,
    });
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};

export { ZoomToMarker };
