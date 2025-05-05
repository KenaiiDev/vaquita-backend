import { eventService } from "@/events/event.service";
import { httpResponse } from "@/shared/libs/httpResponse";

import type { Request, Response, NextFunction } from "express";
import type { CreateEventDto, UpdateEventDto } from "./event.types";

const createEvent = async (
  req: Request<unknown, unknown, CreateEventDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const event = await eventService.create(body);
    return httpResponse.CREATED(res, event);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const event = await eventService.getById(id);
    if (!event) {
      return httpResponse.NOT_FOUND(res, "Event not found");
    }
    return httpResponse.OK(res, event);
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAll();
    return httpResponse.OK(res, events);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (
  req: Request<{ id: string }, unknown, UpdateEventDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedEvent = await eventService.update(id, body);
    if (!updatedEvent) {
      return httpResponse.NOT_FOUND(res, "Event not found");
    }
    return httpResponse.OK(res, updatedEvent);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleted = await eventService.delete(id);
    if (!deleted) {
      return httpResponse.NOT_FOUND(res, "Event not found");
    }
    return httpResponse.NO_CONTENT(res);
  } catch (error) {
    next(error);
  }
};

export { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent };
