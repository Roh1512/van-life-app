import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <h1>Dashbord goes here</h1>
      <Outlet />
    </>
  );
}
export default Dashboard;
