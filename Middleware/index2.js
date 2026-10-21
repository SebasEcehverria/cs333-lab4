import express from "express";
import morgan from "morgan";

// Create our Express server.
const app = express();

// Set the port that our server will run on.
const port = 3000;

// Use Morgan to log information about each request.
app.use(morgan("dev"));

// Handle requests to the home page.
app.get("/", function (req, res) {

  // Send a simple message back to the browser.
  res.send("Hello");
});

// Start the server and listen for requests.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
