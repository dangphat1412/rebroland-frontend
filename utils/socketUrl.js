const SOCKET_URL =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:8080/ws-message"
    : "wss://api.rebroland.me/ws-message";

module.exports = SOCKET_URL;
