import React from "react";

const GlobalSpinner = () => (
  <svg
    version="1.1"
    id="L9"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 0 0"
    xmlSpace="preserve"
    style={{ width: "100px", height: "100px" }}
  >
    <circle cx="12" cy="12" r="3" />
    <g>
      <circle cx="4" cy="12" r="3" />
      <circle cx="20" cy="12" r="3" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="spline"
        dur="1s"
        keySplines=".36,.6,.31,1;.36,.6,.31,1"
        values="0 12 12;180 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </g>
  </svg>
);

export default GlobalSpinner;
