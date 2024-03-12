import React, { useState } from "react";
import axios from "axios";
import OMHeader from "./header.js";

function DonationDetails() {
  const [idNumber, setIdNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState("");

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveButtonClick = async () => {
    if (password !== "1234") {
      window.alert("סיסמה שגויה, לשימוש מנהל המערכת בלבד");
      return;
    }
    
    try {
      const response = await axios.post(
        "https://orchot-moshe.com/.netlify/functions/server/write-to-json",
        { id: idNumber, donation: amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-token-here",
          },
        }
      );
      debugger;
      console.log(response.data);
      window.alert("התרומה התעדכנה בהצלחה");
    } catch (error) {
      console.error("שגיאה בשמירת הנתונים:", error);
      window.alert("שגיאה בשמירת הנתונים");
    }
  };

  return (
    <div>
      <header>
        <OMHeader />
      </header>
      <div>
        <div className="centered-input">
          <div>
            <label>
              מספר זהות:
              <input
                type="text"
                value={idNumber}
                onChange={handleIdNumberChange}
              />
            </label>
          </div>
          <br />
          <br />
          <div>
            <label>
              סכום התרומה:
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </label>
          </div>
          <br />
          <br />
          <div>
            <label>
              סיסמא:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </label>
          </div>
          <br />
          <br />
          <div>
            <button onClick={handleSaveButtonClick} className="button">
              שמירה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDetails;
