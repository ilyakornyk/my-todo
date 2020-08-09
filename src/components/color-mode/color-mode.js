import React from "react";

import "./color-mode.css";

const ColorMode = ({ mode, onChangeMode }) => {
  // console.log(mode);

  let link = document.createElement("link");
  link.rel = "stylesheet";

  let newMode;

  const switchMode = () => {
    if (mode == "night") {
      newMode = "day";

      link.remove();
      link.href = "mode.day.bootstrap.min.css";
      document.getElementsByTagName("head")[0].appendChild(link);
    } else {
      newMode = "night";

      link.remove();
      link.href = "bootstrap.min.css";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  };

  // console.log(window);

  return (
    <button
      type="button"
      class="btn btn-primary"
      onClick={() => {
        onChangeMode(newMode);
        switchMode();
      }}
    >
      Day/night
    </button>
  );
};

export default ColorMode;
