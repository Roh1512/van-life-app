import { NavLink, Link } from "react-router-dom";

function Header() {
  const activeStye = {
    color: "#161616",
    textDecoration: "underline",
    fontWeight: "bold",
  };
  return (
    <>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <NavLink
            to="/host"
            style={({ isActive }) => (isActive ? activeStye : null)}
          >
            Host
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/vans"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Vans
          </NavLink>
        </nav>
      </header>
      ;
    </>
  );
}
export default Header;
