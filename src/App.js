import { React, useMemo } from "react";
import "./App.css";
import LaunchList from "./components/launch-list/LaunchList";
import NavBar from "./components/navbar/NavBar";
import useLaunchesApi from "./hooks/useLaunchesApi";

function App() {
  const {
    launches,
    pageSize,
    pageNumber,
    totalCount,
    searchText,
    setPagination,
    setSearchText,
    setFromDate,
    setToDate,
  } = useLaunchesApi();

  const isNextPageAvailable = useMemo(
    () => pageNumber < totalCount / pageSize,
    [pageNumber, totalCount , pageSize]
  );
  
  return (
    <div className="App">
      <NavBar
        onSearch={setSearchText}
        onPageSizeChanged={(size) => setPagination({pageNumber: 1, pageSize: size, totalCount})}
        onToDateChanged={setToDate}
        onFromDateChanged={setFromDate}
        pageSize={pageSize}
        searchText={searchText}
      />
      <div className="list">
        <LaunchList list={launches} />
      </div>

      {/** TODO: Component of pagination numbers */}
      <div className="pagination-numbers">
        {pageNumber > 1 && (
          <button
            key="prev"
            className="button"
            onClick={() => setPagination({pageNumber: pageNumber - 1, pageSize, totalCount })}
          >
            Previous
          </button>
        )}
        {launches && launches.length > 0 && (
          <span className="current-page" key={pageNumber}>{pageNumber}</span>
        )}
        {isNextPageAvailable && (
          <button
            key="next"
            className="button"
            onClick={() => setPagination({pageNumber: pageNumber + 1, pageSize, totalCount })}
          >
            Next
          </button>
        )}
        {totalCount > 0 && pageSize > 0 && (<button
            key="last"
            className="button"
            onClick={() => setPagination({pageNumber: Math.floor(totalCount / pageSize), pageSize, totalCount })}
          >
            {Math.floor(totalCount / pageSize)}
          </button>)}
      </div>
    </div>
  );
}

export default App;
