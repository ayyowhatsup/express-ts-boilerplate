import express from "express";
import healthRoute from "../api/health/health.route";

const routes = [
  {
    prefix: "/health",
    route: healthRoute,
  },
];

const route = express.Router();

routes.forEach((r) => {
  route.use(r.prefix, r.route);
});

export default route;
