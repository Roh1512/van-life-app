import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
  const activeStyle = {
    color: "#161616",
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end //tells the router to end the matching here (end = {true})
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="/host/reviews"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;
