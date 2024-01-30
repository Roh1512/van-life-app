import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { Suspense } from "react";
import { getVan } from "../../api";

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

function VanDetail() {
  const location = useLocation();
  const dataPromise = useLoaderData();
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <>
      <Link
        to={`..${"?" + search /*Preserve the state of filter */}`}
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={dataPromise.van}>
          {(van) => {
            return (
              <>
                <div className="van-detail-container">
                  <div className="van-detail">
                    <img src={van.imageUrl} alt="" />
                    <i className={`van-type ${van.type} selected`}>
                      {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price">
                      <span>${van.price}</span>/day
                    </p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent This Van</button>
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default VanDetail;
