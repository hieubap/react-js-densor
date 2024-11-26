import React, { useEffect, useRef, useState } from "react";

function useSearch({
  ignoreFirst = false,
  refreshData = (_: string) => {},
} = {}) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const textSearch = useRef<string>("");
  const onSearch = (e) => {
    textSearch.current = e?.target?.value || e;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      refreshData(textSearch.current || null);
    }, 800);
  };

  useEffect(() => {
    if (!ignoreFirst) {
      refreshData(null);
    }
  }, []);

  return {
    onSearch,
  };
}

export default useSearch;
