require("dotenv").config();

const app = require("./src/serverConnection/connection");

const server = require("http").createServer(app);

server.listen(process.env.PORT ?? 3030, () =>
  console.log(`server running and listening on port : ${process.env.PORT}`)
);
