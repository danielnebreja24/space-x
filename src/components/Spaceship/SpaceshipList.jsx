import React, { useRef, useCallback } from "react";

import { useSpaceContext } from "../../context/SpaceContext";
import { SpaceshipItem } from "./SpaceshipItem";
import Spinner from "../Spinner";

export const SpaceshipList = () => {
  const { filteredData, fetchMoreData, hasMore, loading } = useSpaceContext();

  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight + 2 &&
      !loading &&
      hasMore
    ) {
      fetchMoreData();
    }
  }, [loading, hasMore, fetchMoreData]);

  return (
    <div
      className="w-full overflow-auto flex-1 mt-7"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {filteredData.length > 0 ? (
        filteredData.map((spaceship) => (
          <SpaceshipItem key={spaceship.flight_number} spaceship={spaceship} />
        ))
      ) : (
        <p>No data found</p>
      )}

      {loading && <Spinner />}

      {!hasMore && filteredData.length > 0 && (
        <div className="text-center py-4 font-bold">No more data available</div>
      )}
    </div>
  );
};
