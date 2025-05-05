import cors from "cors";
import express, { type Express } from "express";

import { eventRouter } from "@/events/event.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/app/event", eventRouter);

app.use(errorHandler);

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
