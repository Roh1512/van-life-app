import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { Suspense } from "react";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getVan(params.id) }); //return a dataPromise with an object {currentVan : Info from getHostVans(params.id)}
}

function HostVanDetail() {
  const dataPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    color: "#161616",
    textDecoration: "underline",
  };

  return (
    <>
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>
        <Suspense fallback={<h2>Loading van...</h2>}>
          <Await resolve={dataPromise.currentVan}>
            {(currentVan) => {
              return (
                <>
                  <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                      <img src={currentVan.imageUrl} />
                      <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${currentVan.type}`}>
                          {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                      </div>
                    </div>
                    <nav className="host-van-detail-nav">
                      <NavLink
                        to="."
                        end
                        style={({ isActive }) =>
                          isActive ? activeStyles : null
                        }
                      >
                        Details
                      </NavLink>
                      <NavLink
                        to="pricing"
                        style={({ isActive }) =>
                          isActive ? activeStyles : null
                        }
                      >
                        Pricing
                      </NavLink>
                      <NavLink
                        to="photos"
                        style={({ isActive }) =>
                          isActive ? activeStyles : null
                        }
                      >
                        Photos
                      </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </section>
    </>
  );
}
export default HostVanDetail;
