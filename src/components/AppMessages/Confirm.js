import React, { useEffect, useContext } from "react";
import { AppContext } from "../../App";

export default function Confirm() {
  const { appMessage, setAppMessage } = useContext(AppContext);

  useEffect(() => {
    if (appMessage) {
      setTimeout(() => {
        setAppMessage("");
      }, 2000);
    }
  }, [appMessage]);

  return (
    appMessage && (
      <div className="confirm__message">
        <div>
          <i >
            <span style={{fontSize: '4rem', marginRight: '1rem'}} className="material-icons">done</span>
          </i>
        </div>
        <p>{appMessage}</p>
      </div>
    )
  );
}
