/*
Lab 4 Part 1: QR code generator

1. Ask the user for a URL with the @inquirer/prompts package.
2. Turn it into a QR code PNG with the qrcode package.
3. Save every URL, with the date and time, to urls.txt using node:fs/promises.
4. Tell the user it worked.
*/

import { input } from "@inquirer/prompts";
import QRCode from "qrcode";

// Ask the user for a valid website URL.
const url = await input({
  message: "Which website should the QR code point to?",
  validate: function (value) {
    if (URL.canParse(value)) {
      return true;
    }
    return "Type the whole address, starting with https://";
  },
});

console.log("You typed:", url);

// Generate the QR code.
const filename = new URL(url).hostname + ".png";

await QRCode.toFile(filename, url);
console.log("Saved", filename);


