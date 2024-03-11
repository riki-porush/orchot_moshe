import React, { useState, useEffect } from "react";
import "./donationDetailsDesign.css";
import MainPage from "./MainPage.css"
import BarScreen from "./barChart";
import "./App.css";
import SplitBarChart from "./splitBarChart";
import Squares from "./squares";

function MAinPage() {
  const [currentPage, setCurrentPage] = useState(0); // משתנה סטייט לאיתור דף הנוכחי

  const [showDonationDetails, setShowDonationDetails] = useState(false);

  const handleShowDonationDetails = () => {
    setShowDonationDetails(true);
  };

  const handleButtonClick = (component) => {
    renderPage();
};

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDonationDetails(false);
      setCurrentPage((prevPage) => (prevPage + 1) % 4); // מחזיר ערך חדש של דף בתור הדף הבא
    }, 20000); // מתבצע כל 10 שניות

    return () => clearInterval(interval); // מנקה את האינטרוול כאשר הקומפוננטה מסיימת את החיים שלה
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <BarScreen />;
      case 1:
        return <SplitBarChart />;
      case 2:
        return <Squares />;
      default:
        return <BarScreen />; // במקרה של סוף המערך, נחזיר את המסך הראשון
    }
  };

return (
    <div className="centered-input">
   <button className="cool-button" onClick={handleShowDonationDetails}>להזנת נתוני תרומות</button>
        <br />
    </div>
  );
}

export default MainPage;