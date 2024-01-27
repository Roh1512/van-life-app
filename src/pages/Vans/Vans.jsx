import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const displayedVans = vans.filter(
    (van) => !typeFilter || van.type === typeFilter
  );
  {
    /*when typeFilter is null or undefined, all vans will be displayed. Otherwise, only vans matching the specified type will be displayed. */
  }

  const vanElements = displayedVans.map((van) => {
    return (
      <div key={van.id} className="van-tile">
        <Link
          to={`${van.id}`}
          state={{ search: searchParams.toString(), type: typeFilter }}
        >
          <img src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type}`} selected>
            {van.type}
          </i>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="van-list-container">
        <h1>Explore Our Vans Oprtions</h1>
        <div className="van-list-filter-buttons">
          {/* <Link to="?type=simple" className="van-type simple">
            Simple
          </Link>
          <Link to="?type=rugged" className="van-type rugged">
            Rugged
          </Link>
          <Link to="?type=luxury" className="van-type luxury">
            Luxury
          </Link>
          <Link to="." className="van-type clear-filters">
            Clear Filters
          </Link> */}
          <button
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
            onClick={() => {
              setSearchParams({ type: "simple" });
            }}
          >
            Simple
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
            onClick={() => {
              setSearchParams({ type: "rugged" });
            }}
          >
            Rugged
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
            onClick={() => {
              setSearchParams({ type: "luxury" });
            }}
          >
            Luxury
          </button>
          {typeFilter && (
            <button
              className="van-type clear-filters"
              onClick={() => {
                setSearchParams({ type: "" });
              }}
            >
              Clear
            </button>
          )}
        </div>
        <div className="van-list">{vanElements}</div>
      </div>
    </>
  );
}
export default Vans;
