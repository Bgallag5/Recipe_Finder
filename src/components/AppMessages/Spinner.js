import React from "react";

export default function Spinner() {
  return (
    <div className="spinner">
      <svg
        viewBox="0 0 24 24"
        xmlns="<http://www.w3.org/2000/svg>"
        className="spinner-icon"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          strokeWidth="4"
          stroke="tomato"
          fill="none"
        />
      </svg>
    </div>
  );
}
