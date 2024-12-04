import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    if (loading || !hasMore) return;
    const URL =
      process.env.REACT_APP_API_URL || "https://api.spacexdata.com/v3/launches";

    setLoading(true);
    try {
      const response = await axios.get(
        `${URL}?limit=5&offset=${(page - 1) * 5}`
      );
      const result = response.data || [];

      if (result.length === 0 || result.length < 5) setHasMore(false);
      else setPage((prevPage) => prevPage + 1);

      setData((prevData) => [...prevData, ...result]);
      setFilteredData((prevData) => [...prevData, ...result]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterSpaceship = (name = "") => {
    setFilteredData(
      name
        ? data.filter((item) =>
            item.mission_name.toLowerCase().includes(name.toLowerCase())
          )
        : data
    );
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <SpaceContext.Provider
      value={{
        data,
        hasMore,
        loading,
        filteredData,
        fetchMoreData,
        filterSpaceship,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaceContext = () => {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error("useSpaceContext must be used within a SpaceProvider");
  }
  return context;
};
