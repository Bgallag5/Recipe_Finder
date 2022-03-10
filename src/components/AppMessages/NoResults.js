import React from "react";

export default function NoResults({ appError }) {
  return (
    <div className="error">
        <i>
          <span className="material-icons error__message">report_problem</span>
        </i>
      <p>{appError}</p>
    </div>
  );
}
