import thunk from "redux-thunk";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  if (process.env.NODE_ENV === "development") {
    const invariant = require("redux-immutable-state-invariant").default;
    middleware.push(invariant());
  }
  middleware.push(createLogger({ collapsed: true }));
  // middleware.push(createLogger());
}

export default middleware;
