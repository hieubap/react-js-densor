// import supplierService from "service/supplier-service";
import { Card, Pagination, Select, Tabs } from "antd";
import { AppCard } from "components/AppCard";
import AppTable from "components/AppTable";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useScreen } from "../../hooks/useScreen";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { Badge } from "reactstrap";
import LineChart from "./LineChart";
import moment from "moment";

const firebaseConfig = {
  apiKey: "AIzaSyBSlvOK-cj4RzFREDiB1Hw8DTxPzR4CBT8",
  authDomain: "densofinal.firebaseapp.com",
  databaseURL:
    "https://densofinal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "densofinal",
  storageBucket: "densofinal.firebasestorage.app",
  messagingSenderId: "1027489791136",
  appId: "1:1027489791136:web:e761b50220132d6f5d5dc5",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const ContainerStyle = styled.div`
  .oneline {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 180px;
    height: 1.2em;
    white-space: nowrap;
    width: 100%;
  }
  .table button {
    padding: 5px 3px;
    margin-right: 5px;
  }
  .now-ui-icons {
    width: 24px;
  }
`;

function Manager() {
  const columns = [
    {
      title: "STT",
      width: 20,
      render: (_, __, idx) => idx + 1,
    },
    {
      title: "Tên thiết bị",
      width: 100,
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "status",
      render: (v = 1) => (
        <Badge color={v == 1 ? "info" : "danger"}>
          <div className="oneline">
            {v == 1 ? "Đang chạy" : "Ngừng hoạt động"}
          </div>
        </Badge>
      ),
    },
  ];

  // const onEdit = (data) => {
  //   setState({ editData: data, visibleDetail: true });
  // };
  const screenOptions = useScreen({
    state: { labels: [], values: [], max: 10, min: -10, field: "AccX" },
    fetchData: () => new Promise((rs, rj) => {}), // supplierService.search,
  });
  const { state, setState, onSearch } = screenOptions;

  useEffect(() => {
    const MPU6050 = ref(database, "MPU6050");
    onValue(MPU6050, (snapshot) => {
      const data = snapshot.val();
      console.log("MPU6050", data);
      // const entries = Object.entries(data["24-11-2024"]);

      // const labels = entries.map(([k, v]) => k);
      // const realValues = entries.map(([k, v]) => (v as any).AccX);
      // console.log(entries, "entries_reals", realValues);
      // const values = [];
      // const labels = [];
      setState({
        MPU6050: data,
        // values,
        // realValues,
        // labels,
      });
    });

    const prediction = ref(database, "predictions");
    onValue(prediction, (snapshot) => {
      const data = snapshot.val();
      // console.log("predictions", data, Object.values(data)[0]);
      // const entries = Object.entries(data["24-11-2024"]);
      // console.log(entries, "entries");

      // const labels = entries.map(([k, v]) => k);
      // const values = entries.map(([k, v]) => (v as any).AccX);
      // const max = values.reduce((a, b) => (a > b ? a : b));
      // const min = values.reduce((a, b) => (a < b ? a : b));
      // const values = [];
      // const labels = [];
      setState({
        prediction: data,
        // labels,
      });
    });
  }, []);

  console.log(state, "state");

  const { labels, predictValues, realValues, min, max, options } =
    useMemo(() => {
      if (!state.MPU6050 || !state.prediction) return {};
      const options = [
        ...Object.keys(state.prediction),
        ...Object.keys(state.MPU6050),
      ]
        .sort()
        .map((k) => ({
          label: k,
          value: k,
        }));

      const nowKey =
        state.dateField || options[0].value || moment().format("DD-MM-YYYY");

      const entries = state.MPU6050[nowKey]
        ? Object.entries(state.MPU6050[nowKey])
        : state.prediction[nowKey]
        ? Object.entries(state.prediction[nowKey])
        : [];
      const labels = entries
        .map(([k, v]) => k)
        .filter((_, i) => i > entries.length - 60);
      // const realValues = entries.map(([k, v]) => (v as any).AccX);
      console.log(labels, "labels");

      const realValues = state.MPU6050[nowKey]
        ? labels.map((k) => state.MPU6050[nowKey]?.[k]?.[state.field] || 0)
        : [];

      console.log(state, "entries", realValues);
      const predictions = state.prediction[nowKey];
      // const predictEntries = predictions
      //   ? Object.entries(state.prediction[nowKey] || {})
      //   : [];

      // const labels = entries.map(([k, v]) => k);
      // const predictValues = predictEntries.map(([k, v]) => (v as any).AccX);

      const predictValues = state.prediction?.[nowKey]
        ? labels.map((k) => state.prediction?.[nowKey]?.[k]?.[state.field] || 0)
        : [];
      // const predictValues =
      //   predictEntries?.map(([k, v]) => (v as any)[state.field]) || [];
      console.log("prediction_real", predictValues, realValues);
      // console.log(predictions, "predictions", nowKey);

      const max =
        (!!realValues.length ? realValues : predictValues)?.reduce(
          (a, b) => (a > b ? a : b),
          0
        ) * (!!realValues.length ? 3 : 1);
      const _m = (!!realValues.length ? realValues : predictValues)?.reduce(
        (a, b) => (a < b ? a : b),
        Number.MAX_SAFE_INTEGER
      );

      const min = _m < 0 ? (!!realValues.length ? 3 : 1) * _m : 0;

      console.log(min, max, "min_max");

      return {
        labels,
        realValues,
        predictValues,
        min,
        max,
        options,
      };
    }, [state.MPU6050, state.prediction, state.field, state.dateField]);

  return (
    <AppCard>
      <PanelHeader size="sm" />
      <ContainerStyle className="content">
        <Card className="screen-card">
          <div className="screen-header">
            <h3 className="screen-title">Dự đoán độ rung trên 3 trục x y z</h3>
          </div>
          <div className="screen-body" style={{ display: "flex" }}>
            <div>
              <div className="screen-search">
                {/* {searchComponents.map((item, key) =>
                item.type == "select" ? (
                  <Input />
                ) : (
                  <Input
                    className="search-field"
                    placeholder={item.placeholder}
                    onChange={onSearch(item.field)}
                  />
                )
              )} */}
              </div>

              <AppTable
                columns={columns}
                data={[
                  {
                    name: "MPU6050",
                  },
                ]}
                // onRow={
                //   onRowClick
                //     ? (record, rowIndex) => {
                //         return {
                //           onClick: (event) => {
                //             onRowClick(record, rowIndex);
                //           },
                //         };
                //       }
                //     : !!ModalDetail
                //     ? (record, rowIndex) => {
                //         return {
                //           onClick: (event) => {
                //             onEdit(record);
                //           },
                //         };
                //       }
                //     : undefined
                // }
              />

              <Pagination
                onChange={(page) => {
                  setState({ page: page - 1 });
                }}
                current={state.page + 1}
                pageSize={state.size}
                total={state.totalElements}
              />
            </div>
            <div style={{ flex: 1, padding: "0 20px" }}>
              {/* <div></div> */}
              <Tabs
                onChange={(field) => {
                  setState({ field });
                }}
                items={[
                  {
                    key: "AccX",
                    label: "Trục X",
                    children: "",
                  },
                  {
                    key: "AccY",
                    label: "Trục Y",
                    children: "",
                  },
                  {
                    key: "AccZ",
                    label: "Trục Z",
                    children: "",
                  },
                ]}
                tabBarExtraContent={
                  <div>
                    <Select
                      style={{ minWidth: 200 }}
                      options={options}
                      onChange={(dateField) => {
                        setState({ dateField });
                      }}
                    />
                  </div>
                }
              />

              <LineChart
                labels={labels}
                values={predictValues}
                realValues={realValues}
                max={max}
                min={min}
              />
              {/* <Tabs.TabPane>
                
              </Tabs.TabPane> */}
            </div>
          </div>
        </Card>

        {/* {!!ModalDetail && (
          <ModalDetail
            visible={state.visibleDetail}
            onClose={() => {
              setState({ visibleDetail: false, editData: undefined });
            }}
            // setVisible={(visibleDetail) => setState({ visibleDetail })}
            data={state.editData}
            onSuccess={() => {
              setState({
                // page: 0,
                visibleDetail: false,
                editData: undefined,
                refresh: !state.refresh,
              });
              // refreshData();
            }}
          />
        )} */}
      </ContainerStyle>
    </AppCard>
  );
}

export default Manager;
