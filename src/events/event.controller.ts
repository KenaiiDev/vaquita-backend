import { eventService } from "@/events/event.service";
import { httpResponse } from "@/shared/libs/httpResponse";
import type { Request, NextFunction } from "express";
import type { CreateEventDto, UpdateEventDto, Event } from "./event.types";
import type {
  CustomResponseData,
  CustomResponseMessage,
} from "@/shared/types/response.types";

const createEvent = async (
  req: Request<unknown, unknown, CreateEventDto>,
  res: CustomResponseData<Event>,
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
  res: CustomResponseMessage | CustomResponseData<Event>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const event = await eventService.getById(id);
    if (!event) {
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "Event not found"
      );
    }
    return httpResponse.OK(res as CustomResponseData<Event>, event);
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (
  req: Request,
  res: CustomResponseData<Event[]>,
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
  res: CustomResponseMessage | CustomResponseData<Event>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedEvent = await eventService.update(id, body);
    if (!updatedEvent) {
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "Event not found"
      );
    }
    return httpResponse.OK(res as CustomResponseData<Event>, updatedEvent);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (
  req: Request<{ id: string }>,
  res: CustomResponseMessage,
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
