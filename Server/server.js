const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// Middleware לניהול CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // שינוי כתובת המקור לכתובת הנכונה
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// שימוש בנתיב הכללי '/' לספק את קובץ ה-HTML הראשי של ה-React app
app.use(express.static(path.join(__dirname, "client", "build")));

app.post("/write-to-json", (req, res) => {
  // const data = req.body;
  // const jsonData = JSON.stringify(data);

  // // כתיבת הנתונים לקובץ JSON בתיקיה 'src'
  // const filePath = path.join(__dirname, "..", "src", "data.json");

  // fs.readFile(filePath, (err, fileData) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send("שגיאה בקריאת הנתונים");
  //     return;
  //   }

  //   let parsedData = JSON.parse(fileData);
  //   console.log(parsedData);

  //   // עדכון הרשומה הספציפית בקובץ JSON
  //   parsedData = parsedData.map((item) => {
  //     if (item.id === data.id) {
  //       return {
  //         ...item,
  //         donation: Number(item.donation) + Number(data.donation),
  //       };
  //     } else {
  //       return item;
  //     }
  //   });

  //   // שמירת הנתונים לקובץ JSON
  //   fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("שגיאה בשמירת הנתונים");
  //       return;
  //     }
  //     res.status(200).send("הנתונים נשמרו בהצלחה");
  //   });
  // });
  res.send("hello");
});

// הגדרת נתיב לקובץ ה-HTML הראשי של ה-React app
app.get("*", (req, res) => {
  console.log(req);
  return res.status(200).send(",שרת node פועל");
});
// התאמת הפונקציה לפונקציות של Netlify
exports.handler = async function (event, context) {
  // Handle Lambda event here
  // You should parse the event and decide what to do based on the request
  // For example, you can check the HTTP method and path to determine which route to execute

  const route = event.path; // Get the path from the Lambda event

  // Define your logic to handle different routes
  if (route === "/write-to-json" && event.httpMethod === "POST") {
    // Call the corresponding Express route handler
    const expressRes = await new Promise((resolve, reject) => {
      const expressReq = httpMocks.createRequest(event);
      const expressRes = httpMocks.createResponse({ event });
      app.handle(expressReq, expressRes, () => {
        resolve(expressRes);
      });
    });

    // Extract the relevant data from the Express response
    const { statusCode, headers, _getData } = expressRes;

    // Return the Lambda response
    return {
      statusCode,
      headers,
      body: _getData(),
    };
  } else {
    // Handle other routes or HTTP methods
    return {
      statusCode: 200,
      body: "Orchot Moshe",
    };
  }
};
