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


/**
 * Converts special HTML characters into safe text.
 * This prevents users from injecting HTML into our page.
 */
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Checks the submitted fields and creates our band name.
 */
function bandNameGenerator(req, res, next) {
  const street = req.body.street;
  const pet = req.body.pet;

  // Make sure both fields have a value.
  if (!street || !pet) {
    res.status(400).send(
      "Both names are needed. <a href='/'>Try again</a>"
    );
    return;
  }

  // Store the band name for our results page.
  res.locals.bandName = street + " " + pet;

  next();
}


// Handle the form when someone submits it.
app.post("/submit", bandNameGenerator, function (req, res) {

  // Combine the street and pet name into a band name.
  const bandName = req.body.street + " " + req.body.pet;

  // Print the name in the terminal.
  console.log("Band name:", bandName);

  // Display the generated band name on the page.

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Band Name | SoundLab</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <main class="container">
        <div class="top-label">
          <span class="status-dot"></span>
          YOUR BAND IS READY
        </div>
  
        <section class="generator-card">
          <div class="music-icon">♫</div>
          <h1>Your Band <span>Name.</span></h1>
          <p class="subtitle">
            Introducing your next legendary band:
          </p>
  
          <h2 class="band-result">
            ${escapeHtml(res.locals.bandName)} ✌️
          </h2>
  
          <a class="again-button" href="/">
            Generate Another ↗
          </a>
        </section>
      </main>
    </body>
    </html>
  `);
  });  

// Start the server.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
