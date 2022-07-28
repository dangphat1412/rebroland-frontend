const SOCKET_URL =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:8080/ws-message"
    : "ws://api.rebroland.me/ws-message";

module.exports = SOCKET_URL;
