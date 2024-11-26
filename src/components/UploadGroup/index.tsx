import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function UploadItem({
  url,
  onChange = (_: any) => {},
  style = {},
  onDetail = () => {},
  // onEdit = () => {},
  onDelete = () => {},
}) {
  // const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const preview = useRef<any>();
  const inputRef = useRef<any>();

  useEffect(() => {
    setFileUrl(url || "");
  }, [url]);

  // const Container = notContent ? Fragment : ItemContainer;
  // console.log(fileUrl, "fileUrl");

  return (
    <WrapImage>
      {/* <label htmlFor="avatar">Choose a profile picture:</label> */}
      <div className="flex-center pr-4">
        {fileUrl ? (
          <div className="wrap-image">
            <img
              className="image-upload-avaiable pointer"
              ref={preview}
              src={fileUrl}
              style={{
                background: "gray",
                minWidth: 100,
                width: "100%",
                ...style,
              }}
            />
            <div className="icon">
              <i
                className="pointer fa-solid fa-eye mx-2"
                onClick={onDetail}
              ></i>
              <i
                className="pointer fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  inputRef.current.click();
                }}
              ></i>
              <i
                className="pointer fa-solid fa-trash mx-2"
                onClick={onDelete}
              ></i>
            </div>
          </div>
        ) : (
          <div
            className="image-upload-avaiable pointer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ddd",
              width: "100%",
              height: 100,

              ...style,
            }}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        // id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={(e: any) => {
          console.log(e.target.files?.[0], "e.target.files?.[0]");

          // setFile(e.target.files?.[0]);
          const reader = new FileReader();

          reader.onload = function (e: any) {
            // preview.current.src = e.target?.result;
            if (e.target?.result) {
              setFileUrl(e.target.result);
              if (onChange) {
                onChange(e.target.result);
              }
            }
          };

          const file = e.target.files?.[0];

          if (file) reader.readAsDataURL(file);
        }}
      />
    </WrapImage>
  );
}

function OverlayDetail({ open = false, onClose, src = "" }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      modalRender={() => <img src={src} width={"100%"} height={"100%"} />}
    ></Modal>
  );
}

function UploadGroup({ images, onChange = (_: any) => {} }) {
  const [focusIdx, setFocusIdx] = useState(0);
  const [imageList, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setImages(images || []);
    setFocusIdx(0);
  }, [images]);

  useEffect(() => {
    onChange(imageList);
  }, [imageList]);

  return (
    <WrapImage>
      <UploadItem
        style={{ height: "10vw" }}
        url={imageList[focusIdx]?.url}
        onChange={(e) => {
          const newImages = [...imageList];
          if (!newImages[focusIdx]) {
            newImages[focusIdx] = {};
          }
          newImages[focusIdx].url = e;
          newImages[focusIdx].edit = true;
          setImages(newImages);
        }}
        onDelete={() => {
          const newImages = [...imageList].filter((_, i) => i != focusIdx);

          setImages(newImages);
        }}
        onDetail={() => {
          setOpen(true);
        }}
      />
      <div className="d-flex flex-wrap mt-4 mb-2">
        {[...imageList, null].map((item: any, idx) =>
          idx == imageList.length ? (
            <UploadItem
              key={idx}
              url={""}
              style={{ width: 48, height: 50 }}
              onChange={(e) => {
                const newImages = [...imageList];
                if (!newImages[idx]) {
                  newImages[idx] = {};
                }
                newImages[idx].url = e;
                newImages[idx].edit = true;

                setImages(newImages);
                setFocusIdx(idx);
              }}
            />
          ) : (
            <img
              key={idx}
              src={item?.url || ""}
              style={{ width: 50, height: 50, background: "gray" }}
              className="mr-2 mb-2 pointer"
              onClick={() => {
                setFocusIdx(idx);
              }}
            />
          )
        )}
      </div>
      <OverlayDetail
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        src={imageList[focusIdx]?.url}
      />
    </WrapImage>
  );
}

export default UploadGroup;

const WrapImage = styled.div`
  .image-upload-avaiable {
    border: 1px dashed;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .wrap-image {
    position: relative;
    .icon {
      display: none;
      position: absolute;
      top: 0px;
      right: 0px;
      left: 0;
      bottom: 0;
      color: white;
      font-size: 18px;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      img {
        filter: brightness(0.5);
        transition: all 0.6s;
      }
      .icon {
        display: flex;
      }
    }
  }
`;
