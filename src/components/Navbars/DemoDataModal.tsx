import { Button } from "antd";
import { AppModal } from "components/AppModal";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch, IStore } from "redux";

function DemoDataModal() {
  const confirmDelOpen = useSelector(
    (state: IStore) => state.popup.confirmDelOpen
  );
  const onConfirm: any = useSelector((state: IStore) => state.popup.onConfirm);

  const { updateData } = useDispatch<IDispatch>().popup;

  const handleSubmit = async () => {
    onConfirm?.();
    onClose();
  };

  const onClose = () => {
    updateData({ confirmDelOpen: false });
  };

  return (
    <AppModal onCancel={onClose} open={confirmDelOpen} footer={false}>
      <div className="text-title">{"Chú ý !"}</div>
      <div className="text-content">{"Bạn có chắc muốn xóa"}</div>
      <div className="group-bottom">
        <div className="d-flex">
          <Button
            type="primary"
            className="app-button gray ml-auto"
            onClick={onClose}
          >
            <i className="btn-action fa-solid fa-xmark mr-1"></i>
            Hủy
          </Button>
          <Button
            type="primary"
            className="app-button red ml-2"
            onClick={handleSubmit}
          >
            <i className="btn-action fa-solid fa-trash mr-1"></i>
            Xóa
          </Button>
        </div>
      </div>

      {/* <Card>
        <CardBody>
          <Row style={{ padding: "0 10px" }}>
            <Button
              color="white"
              style={{ marginRight: "auto" }}
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Xóa
            </Button>
          </Row>
        </CardBody>
      </Card> */}
    </AppModal>
  );
}

export default DemoDataModal;
