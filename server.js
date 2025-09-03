const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data/products.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON server is running on port ${port}`);
});
