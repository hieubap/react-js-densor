import { Input, Popover, Tooltip } from "antd";
import useTimeout from "hooks/useTimeout";
import { useEffect, useState } from "react";

const PopoverEditInput = ({
  onChange = () => {},
  index,
  value: v,
  title = "",
}: any = {}) => {
  //   const avaiable = v.newPrice && v.newPrice != v.priceSell;
  // const inputRef = useRef();
  const [value, setValue] = useState(v);

  useEffect(() => {
    setValue(v);
  }, [v]);

  const { callback } = useTimeout({
    pending: onChange,
  });

  return (
    <Popover
      title={title}
      trigger={"click"}
      content={
        <Input
          id={"input-field-price-" + index}
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value);
            callback({ value: e.target.value, index });
            // onChange();
          }}
          style={{ margin: -5, textAlign: "right" }}
          placeholder="0"
        />
      }
    >
      <div style={{ width: "100%", height: "100%" }}>{value}</div>
      {/* <Tooltip title="Lưu">
        <i
          onClick={() => {
            // productService
            //   .update({
            //     productId: v.productId,
            //     priceSell: value,
            //   })
            //   .then((res) => {
            //     setState({ refresh: !state.refresh });
            //   });
          }}
          className={
            "btn-action gray fa-solid fa-floppy-disk ml-2 " +
            (avaiable ? "blue" : "gray")
          }
        ></i>
      </Tooltip> */}
    </Popover>
  );
};

export default PopoverEditInput;
