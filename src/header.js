import React from "react";
import { useState } from "react";
import "./header.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "./logoFinal.png";
import studentsData from "./data.json";
import App from "./App";
import HomePage from "./home.js";
import { Link } from "react-router-dom";

const OMHeader = () => {
  const [redirectToApp, setRedirectToApp] = useState(false);
  const target = 4000000;
  const totalDonation = studentsData.reduce((accumulator, currentEntry) => {
    return accumulator + currentEntry.donation;
  }, 0);
  const percentages = (totalDonation / target) * 100;

  const handleRedirectToApp = () => {
    setRedirectToApp(true);
  };

  if (redirectToApp) {
    <Link to="/" className="cool-button">
      למתרימים
    </Link>;
    return <HomePage />;
  }

  return (
    <div>
      <div className="headerImg">
        <div className="logoBanner">
          <img src={logo} alt="logo" />
        </div>
        <div className="prog-div">
          <div className="progress">
            <CircularProgressbar
              value={totalDonation}
              maxValue={target}
              text={`${percentages}%`}
              styles={buildStyles({
                textColor: "#246860",
                pathColor: "#6D9B97",
                trailColor: "#1B4C47",
              })}
              className="progressbar-text"
            />
            <div className="text">
              עד כה גויסו {totalDonation} ש"ח, מתוך {target}
            </div>
          </div>
          <Link to="/" className="cool-button-header">
            לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OMHeader;
