// import React from "react";
// import { useState, useEffect } from "react";
// import "./header.css";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import logo from "./logoFinal.png";
// import studentsData from "./data.json";
// import HomePage from "./home.js";
// import { Link } from "react-router-dom";

// const OMHeader = () => {
  
//   const [redirectToApp, setRedirectToApp] = useState(false);
//   const target = 4000000;
//   const totalDonation = studentsData.reduce((accumulator, currentEntry) => {
//     return accumulator + currentEntry.donation;
//   }, 0);
//   const percentages = (totalDonation / target) * 100;

//   const handleRedirectToApp = () => {
//     setRedirectToApp(true);
//   };

//   if (redirectToApp) {
//     <Link to="/" className="cool-button">
//       למתרימים
//     </Link>;
//     return <HomePage />;
//   }

//   return (
//     <div>
//       <div className="headerImg">
//         <div className="logoBanner">
//           <img src={logo} alt="logo" />
//         </div>
//         <div className="prog-div">
//           <div className="progress">
//             <CircularProgressbar
//               value={totalDonation}
//               maxValue={target}
//               text={`${percentages}%`}
//               styles={buildStyles({
//                 textColor: "#246860",
//                 pathColor: "#6D9B97",
//                 trailColor: "#1B4C47",
//               })}
//               className="progressbar-text"
//             />
//             <div className="text">
//               עד כה גויסו {totalDonation} ש"ח, מתוך {target}
//             </div>
//           </div>
//           <Link to="/" className="cool-button-header">
//             לעמוד הבית
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OMHeader;
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "./logoFinal.png";
import { Link } from "react-router-dom";
import HomePage from "./home.js";


const OMHeader = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setStudentsData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const target = 4000000;
  const totalDonation = studentsData.reduce((accumulator, currentEntry) => {
    return accumulator + currentEntry.donation;
  }, 0);
  const percentages = (totalDonation / target) * 100;

  const [redirectToApp, setRedirectToApp] = useState(false);

  const handleRedirectToApp = () => {
    setRedirectToApp(true);
  };

  if (redirectToApp) {
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
