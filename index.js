#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const pdfPath = path.join(__dirname, "resume.pdf");

if (!fs.existsSync(pdfPath)) {
  console.error("Resume PDF not found.");
  process.exit(1);
}

const platform = process.platform;
let command;

if (platform === "win32") {
  command = `start "" "${pdfPath}"`; 
} else if (platform === "darwin") {
  command = `open "${pdfPath}"`;      
} else if (platform === "linux") {
  command = `xdg-open "${pdfPath}"`;  
} else {
  console.error("Unsupported platform.");
  process.exit(1);
}

exec(command, (error) => {
  if (error) {
    console.error("Failed to print PDF:", error.message);
  } else {
    console.log("Resume sent to printer successfully!");
  }
});
