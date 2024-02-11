import React from "react";
import { MdAddCircle } from "react-icons/md";

const AddButton = (props: { onClick?: () => void }) => (
  <div
    onClick={props.onClick}
    className={
      "flex flex-col gap-1 w-28 h-24 p-1 cursor-pointer rounded-lg items-center justify-center hover:scale-110 transition-[transform]"
    }
  >
    <MdAddCircle size={32} />
  </div>
);

export default AddButton;
