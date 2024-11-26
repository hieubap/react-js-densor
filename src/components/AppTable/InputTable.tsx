import { Input, Popover, Tooltip } from "antd";
import useTimeout from "hooks/useTimeout";
import { useEffect, useState } from "react";

const InputTable = ({
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
    <Input
      value={value}
      type="number"
      onChange={(e) => {
        setValue(e.target.value);
        callback({ value: e.target.value, index });
      }}
      style={{ textAlign: "right" }}
      placeholder="0"
    />
  );
};

export default InputTable;
