import { Outlet } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
