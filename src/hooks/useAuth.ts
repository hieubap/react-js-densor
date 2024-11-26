import { MutableRefObject, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch, IStore } from "redux";
import { requestHeaders } from "service/request";

function useAuth() {
  const userInfo: any = useSelector((state: IStore) => state.account.userInfo);
  const storeLoaded = useSelector((state: IStore) => state.account.storeLoaded);

  const updateData = useDispatch<IDispatch>().account.updateData;

  useEffect(() => {
    if (storeLoaded) return;
    const str = localStorage.getItem("employee-auth");

    if (str) {
      console.log("init_useAuth");
      const data = JSON.parse(str) || {};
      requestHeaders.authorization = "Bearer " + data.token;

      updateData({
        storeLoaded: true,
        userInfo: { ...(data || {}) },
      });
    }
  }, []);

  const saveAuthData = (data: any = {}) => {
    const merge = { ...userInfo, ...data, token: data.token || userInfo.token };
    updateData({ userInfo: merge });
    localStorage.setItem("employee-auth", JSON.stringify(merge));
  };

  return {
    userInfo: userInfo,
    saveAuthData,
  };
}

export default useAuth;
