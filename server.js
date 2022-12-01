// import app from "./app";
const app = require("./src/app");

const server = app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

module.exports = server;
