const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the 'img' folder
app.use("/img", express.static(path.join(__dirname, "img")));

app.get("/get-images", (req, res) => {
  const folderPath = path.join(__dirname, "img/portfolio");
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }

    // Filter out only jpg files matching the pattern (something-number.jpg)
    const imageFiles = files.filter(
      (file) => file.endsWith(".jpg") && /\w+-\d+\.jpg/.test(file)
    );

    // Send the image file names as a JSON array
    res.json(imageFiles);
  });
});

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
