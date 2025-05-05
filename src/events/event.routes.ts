import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "@/events/event.controller";

const eventRouter: Router = Router();

eventRouter.route("/events").get(getAllEvents).post(createEvent);
eventRouter
  .route("/events/:eventId")
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

export { eventRouter };
