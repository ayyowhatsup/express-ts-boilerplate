import express from "express";
import healthCheck from "./health.controller";

const route = express.Router();

route.get("/", healthCheck);

export default route;
