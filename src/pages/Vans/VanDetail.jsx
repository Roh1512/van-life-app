import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function VanDetail() {
  const params = useParams();
  const location = useLocation();
  const [van, setVan] = useState(null);
  console.log(location);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);
  return (
    <>
      <Link
        to={`..${"?" + search /*Preserve the state of filter */}`}
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to {type} vans</span>
      </Link>
      <div className="van-detail-container">
        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} alt="" />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
            <p>{van.description}</p>
            <button className="link-button">Rent This Van</button>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}

export default VanDetail;
