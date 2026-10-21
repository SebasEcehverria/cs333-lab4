import express from "express";

// Create our Express server.
const app = express();

// Set the port the server will run on.
const port = 3000;

// Create our own middleware to log requests.
function logger(req, res, next) {

  // Print what type of request was made.
  console.log("Request method:", req.method);

  // Print the URL being requested.
  console.log("Request URL:", req.url);

  // Move on to the next middleware or route.
  next();
}

// Run our logger middleware on incoming requests.
app.use(logger);

// Handle requests to the homepage.
app.get("/", function (req, res) {
  res.send("Hello");
});

// Start the server.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
