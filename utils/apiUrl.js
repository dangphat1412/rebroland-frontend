const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://api.rebroland.me";

module.exports = API_URL;
