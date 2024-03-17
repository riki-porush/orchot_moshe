const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.static(path.join(__dirname, "..", "..", "src", "build")));

app.post("/write-to-json", (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data);

  const filePath = path.join(__dirname, "..", "..", "src", "data.json");

  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data");
      return;
    }

    let parsedData = JSON.parse(fileData);
    parsedData = parsedData.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          donation: Number(item.donation) + Number(data.donation),
        };
      } else {
        return item;
      }
    });

    fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving data");
        return;
      }
      res.status(200).send("Data saved successfully");
    });
  });
});

// app.get("/read-from-json", (req, res) => {
//   const filePath = path.join(__dirname, "src", "data.json");

//   fs.readFile(filePath, (err, fileData) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error reading data");
//       return;
//     }

//     let parsedData = JSON.parse(fileData);

//     res.status(200).send(parsedData);
//   });
// });

// app.get("*", (req, res) => {
//   res.status(200).send("Server is running");
// });

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "POST" && event.path.endsWith("/write-to-json")) {
      try {
        const data = JSON.parse(event.body);

        const jsonData = JSON.stringify(data);

        const filePath = path.join(__dirname, "..", "..", "src", "data.json");

        const fileData = fs.readFileSync(filePath);
        let parsedData = JSON.parse(fileData);
        console.log(parsedData);

        // עדכון הרשומה הספציפית בקובץ JSON
        parsedData = parsedData.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              donation: Number(item.donation) + Number(data.donation),
            };
          } else {
            return item;
          }
        });

        // שמירת הנתונים לקובץ JSON
        fs.writeFileSync(filePath, JSON.stringify(parsedData));
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Data updated successfully",
            222: parsedData,
          }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Error, sorry",
            errorMessageOops: error,
          }),
        };
      }
    } else if (
      event.httpMethod === "GET" &&
      event.path.endsWith("/read-from-json")
    ) {
      const filePath = path.join(__dirname, "..", "..", "src", "data.json");

      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          console.error(err);
          return {
            statusCode: 500,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "error while reading the data" }),
          };
        }

        let parsedData = JSON.parse(fileData);

        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Data read successfully",
            333: parsedData,
          }),
        };
      });
    } else {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
