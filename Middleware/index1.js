import express from "express";

const app = express();
const port = 3000;
// Allow Express to read data submitted through HTML forms.
app.use(express.urlencoded());

app.use(express.static("public"));

// Handle the form when someone submits it.
app.post("/submit", function (req, res) {

  // Print the submitted data in the terminal.
  console.log(req.body);

  // Send a response back to the browser.
  res.send("Got it! Look at the server terminal.");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
