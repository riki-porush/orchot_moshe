import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import studentsData from "./data.json";
import "./home.css";
import "./header.css";
import logo from "./logoFinal.png";
import engProspectus from "./pros-en.pdf";
import hebProspectus from "./pros-he.pdf";
import pros_image from "./img.png";

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
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

  const openPdfInNewTab = (pdfSrc) => {
    window.open(pdfSrc, "_blank", "fullscreen=yes");
  };

  return (
    <div dir="rtl">
      <div className="content-video">
        <div className="movie-container">
          <div className="video-container">
            {videoPlaying && (
              <video controls autoPlay>
                <source src="/pubvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <video controls loop muted={!videoPlaying}>
              <source src="/pubvid.mp4" type="video/mp4" />
            </video>
          </div>

          {videoPlaying && (
            <video controls autoPlay>
              <source src="/buildvid.mp4" type="video/mp4" />
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
            <a
              href={engProspectus}
              target="_blank"
              style={{ fontSize: "20px" }}
            >
              לצפייה במסך מלא באנגלית
            </a>
            <br></br>
            <br></br>
            <a
              href={hebProspectus}
              target="_blank"
              style={{ fontSize: "20px" }}
            >
              לצפייה במסך מלא בעברית
            </a>
            <img src={pros_image} alt="image"></img>
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
