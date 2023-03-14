const http = require("http");
const { once } = require("events");

const DEFAULT_USER = {
  username: "john_doe",
  password: "123",
};

const routes = {
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },
  "/login:post": async (req, res) => {
    const data = JSON.parse(await once(req, "data"));
    if (
      data.username.toLowerCase() !== DEFAULT_USER.username.toLowerCase() ||
      data.password !== DEFAULT_USER.password
    ) {
      res.writeHead(401);
      res.end("login failed!");
      return;
    }

    return res.end("login succeeded!");
  },
  default(req, res) {
    res.writeHead(404);
    return res.end("not found");
  },
};

function handler(req, res) {
  const { url, method } = req;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(req, res);
}

const app = http
  .createServer(handler)
  .listen(3333, () => console.log("running on port 3333"));

module.exports = app;
