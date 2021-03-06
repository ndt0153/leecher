const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/", (req, res) => app.render(req, res, "/"));
    server.get("/apk/:id", (req, res) => {
      return app.render(req, res, "/apk", { id: req.params.id });
    });
    server.get("/page/:id", (req, res) => {
      return app.render(req, res, "/page", { id: req.params.id });
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, err => {
      if (err) throw err;
      console.log(">Ready on htt://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
