import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Spinner from "./Spinner";

const Search = ({ setWoeid }) => {
  const [locations, setLocations] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const close = () => {
    const search = document.querySelector(".search");
    search.classList.remove("slideOut");
    search.classList.add("slideIn");
  };

  const search = () => {
    setLoading(true);
    fetch(
      `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=${text}`
    )
      .then(async (res) => {
        const data = await res.json();
        setLoading(false);
        setLocations(data);
      })
      .catch((err) => setLoading(false));
  };

  const change = (woeid) => {
    setWoeid(woeid);
    const search = document.querySelector(".search");
    search.classList.remove("slideOut");
    search.classList.add("slideIn");
  };

  return (
    <div className="search">
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="container">
          <div className="stick">
            <div className="close">
              <i className="fas fa-times" onClick={close}></i>
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="cover">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search location"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <button onClick={search}>Search</button>
            </form>
          </div>
          {!loading ? (
            <ul>
              {locations.map((location) => (
                <li key={location.woeid} onClick={() => change(location.woeid)}>
                  {location.title}
                  <i className="fas fa-angle-right"></i>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ height: "100px" }}>
              <Spinner />
            </div>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

export default Search;
