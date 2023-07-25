import React, { useState } from "react";
import Select from "react-select";
import "../styles/select-category.css";

export function SelectCategory(props) {
  const [category, setCategory] = useState(null); // the input inside search bar for stock symbol
  const handleChange = (opt) => {
    props.setCategory(opt.value);
  };

  return (
    <div class="select-category">
      <Select
        className="select-bar"
        placeholder={props.placeholder}
        options={props.options}
        onChange={handleChange}
      />
    </div>
  );
}
