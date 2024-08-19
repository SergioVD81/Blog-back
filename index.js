const http = require("http");
const app = require("./src/App");

const server = http.createServer(app);

require("./src/config/db");

const port = process.env.PORT ?? 3000;

server.listen(port);

server.on("listening", () => {
  console.log(`Escuchando a través del puerto ${port}`);
});

server.on("error", (error) => {
  console.log(`${error.name}:${error.message}`);
});
