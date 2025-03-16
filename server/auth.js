// Basic authentication middleware for json-server
/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = (req, res, next) => {
  // Skip authentication for OPTIONS requests (for CORS)
  if (req.method === "OPTIONS") {
    return next();
  }

  // Get authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  // Extract credentials from Basic Auth header
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  // Load users from JSON file
  const fs = require("fs");
  const path = require("path");
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
  );

  // Check if credentials match any user
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!validUser) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // User is authenticated, proceed
  next();
};
