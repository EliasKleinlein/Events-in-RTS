import { Route, Routes } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import CreateEvents from "./pages/CreateEvents";
import EventMap from "./pages/EventMap";
import EventDetails from "./pages/EventsDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/createevents"
          element={
            <ProtectedRoute>
              <CreateEvents />
            </ProtectedRoute>
          }
        />
        <Route path="/eventsdetails/:eventid" element={<EventDetails />} />
        <Route path="/map" element={<EventMap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
