import http from "http";

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.end("Hello from server ")
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
