import React, { useRef } from "react";

function useTimeout({ pending = (_: any) => {} }: any) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const callback = (_: any) => {
    const payload = _;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      pending(payload);
    }, 800);
  };
  return { callback };
}

export default useTimeout;
