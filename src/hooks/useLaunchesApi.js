import { useState, useEffect } from "react";
import HttpUtils from "../utils/HttpUtils";

const useLaunchesApi = () => {
  const [{ pageSize, pageNumber, totalCount }, setPagination] = useState({
    pageSize: 5,
    pageNumber: 1,
    totalCount: 0,
  });
  const [launches, setLaunches] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await HttpUtils.get(
        pageNumber,
        pageSize,
        searchText,
        fromDate,
        toDate
      );

      //Paginating the array
      setPagination({ pageSize, pageNumber, totalCount: response.count });
      if (response.results) {
        const newLaunches = response.results.map((result) => {
          return {
            id: result.id,
            name: result.name,
            status: result.status?.abbrev,
            description: result.mission?.description,
            image: result.image,
            url: result.url,
            date: result.net
              ? new Date(result.net).toLocaleString()
              : "unknown",
          };
        });
        setLaunches(newLaunches);
      }
    };
    fetchData();
    // When one of the properties change OR when the component is rendered, the effect will be executed
  }, [pageNumber, pageSize, searchText, fromDate, toDate]);

  return {
    launches,
    pageSize,
    pageNumber,
    totalCount,
    searchText,
    setPagination,
    setSearchText,
    setFromDate,
    setToDate,
  };
};

export default useLaunchesApi;
