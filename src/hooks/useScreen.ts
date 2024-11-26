import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useScreen = ({
  state: _initState,
  fetchData = async () => {},
}: {
  state?: any;
  fetchData: (payload?: any) => Promise<any>;
}) => {
  const [state, _setState] = useState<any>({
    page: 0,
    size: 15,
    paramSearch: {},
    ...(_initState || {}),
  });
  const setState = (data: any) => {
    _setState((pre: any) => ({ ...pre, ...data }));
  };

  const timeoutRef = useRef<any>();
  const textSearch = useRef("");
  const onSearch = (field: string, isSelect?: boolean) => (e) => {
    textSearch.current = e.target.value || null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newSearchParam = { ...state.paramSearch };
      newSearchParam[field] = textSearch.current;
      setState({ paramSearch: newSearchParam, refresh: !state.refresh });
      //   fetchData(textSearch.current || "");
    }, 800);
  };

  useEffect(() => {
    fetchData({
      page: state.page,
      size: state.size,
      sort: "createdAt,desc",
      ...(state.paramSearch || {}),
    })
      .then((res) => {
        setState({ dataList: res.data, totalElements: res.totalElements });
      })
      .catch((e) => {
        toast(e?.message || e.toString(), { type: "error" });
      });
  }, [state.page, state.refresh]);

  return {
    state,
    setState,
    onSearch,
  };
};
