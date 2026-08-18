import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <h1>Test 1</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
