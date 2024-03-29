import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import React from "react";

export default function CheckBox({ id, checked, toggleChecked }) {
  const handleClick = () => toggleChecked(id),
    style = { marginRight: "16px", minWidth: "16px" };

  return checked.includes(id) ? (
    <MdCheckBox style={style} onClick={handleClick} />
  ) : (
    <MdCheckBoxOutlineBlank style={style} onClick={handleClick} />
  );
}
