import client from "prom-client";
import express from "express";

const collectDefaultMetrics = client.collectDefaultMetrics;

// Collect system metrics (CPU, memory, event loop lag, )
//updates evry 5 secs
collectDefaultMetrics({ timeout: 5000 });

const router = express.Router();

// Example of a custom counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"], //eg POST, api/tasks/ahny , 200
});

// Middleware to count requests
router.use((req, res, next) => {
  //"finish" is emitted after the response has been fully sent to the client.
  res.on("finish", () => {
    httpRequestCounter.inc({
      //increments the counter by 1
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Expose /metrics endpoint
router.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType); //text/plain
  res.end(await client.register.metrics()); //return all the metrics in text/plain
});

export default router;
