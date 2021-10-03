import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "./search-bar/SearchBar";
import "./navbar.css";

const pageSizes = [5, 10, 15, 20];

const NavBar = ({
  onSearch,
  onPageSizeChanged,
  onToDateChanged,
  onFromDateChanged,
  pageSize,
}) => {
  const [isFutureLaunches, setIsFutureLaunches] = useState(false);

  const setDates = useCallback(() => {
    // if isFuture is false, we want to filter UNTIL the current date
    onToDateChanged(!isFutureLaunches ? new Date().toISOString() : null);
    // if isFuture is true, we want to filter FROM the current date
    onFromDateChanged(isFutureLaunches ? new Date().toISOString() : null);
  }, [isFutureLaunches, onFromDateChanged, onToDateChanged]);

  useEffect(() => {
    setDates();
  }, [setDates]);

  return (
    <div className="navbar">
      {/** TODO: Component of DropDown */}
      <div className="dropdown">
        <button className="dropbtn">
          {isFutureLaunches === true ? "Future Launches" : "Past Launches"}
        </button>
        <ul className="dropdown-content">
          <li
            key="future"
            onClick={() => setIsFutureLaunches(true)}
            disabled={isFutureLaunches === true}
          >
            Future Launches
          </li>
          <li
            key="past"
            onClick={() => setIsFutureLaunches(false)}
            disabled={isFutureLaunches === false}
          >
            Past Launches
          </li>
        </ul>
      </div>
      {/** TODO: Component of DropDown */}
      <div className="dropdown">
        <button className="dropbtn">Page Size: {pageSize}</button>
        <ul className="dropdown-content">
          {pageSizes.map((p) => (
            <li
              key={p}
              onClick={() => onPageSizeChanged(p)}
              value={p}
              disabled={p === pageSize}
            >{p}
            </li>
          ))}
        </ul>
      </div>
      <div className="search">
        <SearchBar onSubmit={onSearch} />
      </div>
    </div>
  );
};

export default NavBar;
