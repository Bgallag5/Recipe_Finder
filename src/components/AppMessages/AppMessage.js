import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../App";

export default function AppMessage() {
  const { appMessage, setAppMessage } = useContext(AppContext);

  const [messageJSX, setMessage] = useState("");

  const buildMessage = () => {
    switch (appMessage.type) {
      case "bookmarkAdded":
        setMessage(
          <div className="confirm__message">
            <div>
              <i>
                <span
                  style={{ fontSize: "4rem", marginRight: "1rem" }}
                  className="material-icons"
                >
                  done
                </span>
              </i>
            </div>
            <p>{appMessage.msg}</p>
          </div>
        );
        return;
      case "incompleteForm":
        setMessage(
          <div className="form__message">
            <div>
              <i>
                <span
                  style={{ fontSize: "4rem", marginRight: "1rem" }}
                  className="material-icons"
                >
                  priority_high
                </span>
              </i>
            </div>
            <p>{appMessage.msg}</p>
          </div>
        );
        return
      default:
        return null;
    }
  };

  useEffect(() => {
    appMessage && buildMessage();
  }, [appMessage]);

  // clear appMessage
  useEffect(() => {
    if (appMessage) {
      setTimeout(() => {
        setAppMessage("");
      }, appMessage.timer);
    }
  }, [appMessage]);

  return appMessage && messageJSX;
}
