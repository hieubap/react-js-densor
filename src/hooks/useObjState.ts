import { useState } from "react";

function useObjState(initState = {}) {
  const [state, _setState] = useState<any>(initState);
  const setState = (data: any) => {
    _setState((pre: any) => ({ ...pre, ...data }));
  };

  return [state, setState];
}

export default useObjState;
