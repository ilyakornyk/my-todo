import React, { useState } from "react";

import "./input.css";

const Input = ({ onAddItem }) => {
  const [label, setLabel] = useState("");

  const onLabelChange = (e) => {
    const label = e.target.value;
    setLabel(() => label);
  };

  const onEnterClick = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("add_item").click();
    }
  };

  return (
    <React.Fragment>
      <div className="input-group d-flex justify-content-center mt-3 col-6">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          onChange={onLabelChange}
          onKeyUp={onEnterClick}
        />

        <div class="input-group-append">
          <button
            id="add_item"
            type="button"
            class="btn btn-primary"
            onClick={() => onAddItem(label)}
          >
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Input;
