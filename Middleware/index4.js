import express from "express";
import morgan from "morgan";

// Create the Express application.
const app = express();

// Set the port our server will use.
const port = 3000;

// Log requests so we can see what the server receives.
app.use(morgan("dev"));

// Allow Express to read submitted form data.
app.use(express.urlencoded());

// Serve HTML, CSS, and other files from public.
app.use(express.static("public"));

// Handle the form when someone submits it.
app.post("/submit", function (req, res) {

  // Combine the street and pet name into a band name.
  const bandName = req.body.street + " " + req.body.pet;

  // Print the name in the terminal.
  console.log("Band name:", bandName);

  // Display the generated band name on the page.
  res.send("<h1>Your band name is:</h1><h2>" + bandName + "</h2>");
});

// Start the server.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
