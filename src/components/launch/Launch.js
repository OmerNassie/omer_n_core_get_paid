import React from "react";
import { baseUrl } from "../../utils/HttpUtils";
import "./launch.css";

const Launch = ({ id, name, status, description, image, date }) => {
  async function copyIdToClipboard() {
    //TODO: create a detailed launch component & switch the URL to there.
    let text = `${baseUrl}/launch/${id}`;
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      //Fallback for Internet explorer
      return document.execCommand("copy", true, text);
    }
  }

  return (
    <>
      <div className="launch-container">
        <div className="left-launch">
          {image && <img src={image} className="launch-image" alt="rocket" />}
        </div>
        <div className="right-launch">
          <h2>{name}</h2>
          <div></div>
          <h4>{date}</h4>
          <div className={status.toLowerCase()}>{status}</div>
          <div className="description">{description}</div>
          <div className="footer">
            <button className="button" onClick={copyIdToClipboard}>
              Copy to clipboard
            </button>
            <button className="button" onClick={copyIdToClipboard}>
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Launch;
