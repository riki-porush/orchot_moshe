import React, { useState, useEffect } from "react";
import BarScreen from "./barChart";
import SplitBarChart from "./splitBarChart";
import Squares from "./squares";
import OMHeader from "./header";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import studentsData from "./data.json";
import { BrouthRoute } from "./dashboard";
import "./home.css";
import "./header.css";
import logo from "./logoFinal.png";
import vy from "./videoYeshiva.js";
import pdfFile from "./text.pdf";

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRender, setShowRender] = useState(false);
  const [showDonationDetails, setShowDonationDetails] = useState(false);
  const target = 4000000;
  const totalDonation = studentsData.reduce((accumulator, currentEntry) => {
    return accumulator + currentEntry.donation;
  }, 0);
  const percentages = (totalDonation / target) * 100;

  const playVideo = () => {
    setVideoPlaying(true);
  };

  const handleVideoClick = () => {
    setVideoPlaying(true);
  };

  const handleShowRender = () => {
    setShowRender(true);
    setShowDonationDetails(false);
  };

  const openPdfInNewTab = () => {
    window.open(pdfFile, "_blank", "fullscreen=yes");
  };

  return (
    <div dir="rtl">
      <div className="content-video">
        <div className="movie-container">
          <div className="video-container">
            {videoPlaying && (
              <video controls autoPlay>
                <source src="/pubvid.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            )}
            <video controls loop muted={!videoPlaying}>
              <source src="/pubvid.mp4" type="video/mp4" />
            </video>
          </div>

          {videoPlaying && (
            <video controls autoPlay>
              <source src="/buildvid.mp4" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          )}
          <div className="video-container">
            <video controls loop muted={!videoPlaying}>
              <source src="/buildvid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="right-container">
          <Link to="/dashboard" className="cool-button">
            למתרימים
          </Link>
          <div className="card-text">
            <a href={pdfFile} target="_blank" style={{ fontSize: "20px" }}>
              לצפייה במסך מלא
            </a>
            <embed
              src={pdfFile}
              type="application/pdf"
              width="100%"
              height="330px"
            />
          </div>
        </div>
        <div className="right-container">
          <div className="logo">
            <img src={logo} alt="logo" onClick={handleVideoClick} />
          </div>
          <Link to="/donationDetails" className="cool-button">
            להזנת פרטי תרומה
          </Link>
        </div>
        <div className="right-container">
          <a
            href="https://www.matara.pro/nedarimplus/online/?mosad=7004844"
            className="cool-button"
          >
            לתרומה
          </a>
          <div className="progress-h">
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
              עד כה גויסו {totalDonation} מתוך {target}
            </div>
          </div>
        </div>
        <vy></vy>
      </div>
    </div>
  );
};

export default HomePage;
