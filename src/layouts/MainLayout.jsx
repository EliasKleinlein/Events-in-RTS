import { Outlet } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl flex-col overflow-hidden rounded-box bg-base-100 shadow-2xl sm:min-h-[calc(100vh-3rem)]">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
