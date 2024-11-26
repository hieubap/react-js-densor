import { Button } from "antd";
import { AppModal } from "components/AppModal";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch, IStore } from "redux";

function ConfirmDelete() {
  // const deleteId = useSelector((state: IStore) => state.popup.deleteId);
  const confirmDelOpen = useSelector(
    (state: IStore) => state.popup.confirmVisible
  );

  const type = useSelector((state: IStore) => state.popup.type);
  const title = useSelector((state: IStore) => state.popup.title);
  const content = useSelector((state: IStore) => state.popup.content);
  const cancelText = useSelector((state: IStore) => state.popup.cancelText);
  const okText = useSelector((state: IStore) => state.popup.okText);
  const onCancel = useSelector((state: IStore) => state.popup.onCancel);
  const onOk = useSelector((state: IStore) => state.popup.onOk);
  // const onConfirm: any = useSelector((state: IStore) => state.popup.onConfirm);

  const { updateData } = useDispatch<IDispatch>().popup;

  const handleSubmit = async () => {
    onOk?.();
    onClose();
  };

  const onClose = () => {
    updateData({ confirmDelOpen: false, confirmVisible: false });
    onCancel?.();
  };

  const { classIcon, color } = useMemo(() => {
    return type == "confirm"
      ? { classIcon: "fa-circle-check", color: "green" }
      : { classIcon: "fa-trash", color: "red" };
  }, [type]);

  return (
    <AppModal
      style={{ zIndex: 999 }}
      onCancel={onClose}
      open={confirmDelOpen}
      footer={false}
    >
      <div className="text-title">{title || "Chú ý !"}</div>
      <div className="text-content">{content || "Bạn có chắc muốn xóa"}</div>
      <div className="group-bottom">
        <div className="d-flex">
          <Button
            type="primary"
            className="app-button gray ml-auto"
            onClick={onClose}
          >
            <i className="btn-action fa-solid fa-xmark mr-1"></i>
            {cancelText}
          </Button>
          <Button
            type="primary"
            className={"app-button ml-2 " + color}
            onClick={handleSubmit}
          >
            <i className={"btn-action mr-1 fa-solid " + classIcon}></i>
            {okText}
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

export default ConfirmDelete;
