import { expect, describe, vi, beforeEach, afterEach, it } from "vitest";
import httpMocks from "node-mocks-http";

import { eventService } from "@/events/__mocks__/event.service";
import { httpResponse } from "@/shared/libs/__mocks__/httpResponse";

import {
  getEventById,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/events/event.controller";

import type { NextFunction, Request } from "express";
import type { Event } from "@/events/event.types";
import {
  CustomResponseData,
  CustomResponseMessage,
} from "@/shared/types/response.types";

vi.mock("@/shared/libs/httpResponse");
vi.mock("@/events/event.service");

describe("Event controller", () => {
  const mockDate = new Date("2025-05-04T12:00:00Z");

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });
  describe("Event controller", () => {
    const mockDate = new Date("2025-05-04T12:00:00Z");

    beforeEach(() => {
      vi.resetAllMocks();
      vi.useFakeTimers();
      vi.setSystemTime(mockDate);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe("Create", () => {
      it("Should create and return a new event", async () => {
        const eventData = {
          name: "New event",
          date: mockDate,
        };

        const createdEvent = {
          id: "65b10bb0b57984db9b6aaed7",
          ...eventData,
          createdAt: mockDate,
          updatedAt: mockDate,
        };

        const req = httpMocks.createRequest({
          method: "POST",
          url: "/events",
          body: eventData,
        });

        const res =
          httpMocks.createResponse() as unknown as CustomResponseData<Event>;
        const next = vi.fn() as NextFunction;

        eventService.create.mockResolvedValue(createdEvent);

        const mockHttpResponse =
          httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
        httpResponse.CREATED.mockReturnValue(mockHttpResponse);

        const result = await createEvent(req, res, next);

        expect(eventService.create).toHaveBeenCalledWith(eventData);
        expect(httpResponse.CREATED).toHaveBeenCalledWith(res, createdEvent);
        expect(result).toBe(mockHttpResponse);
      });
    });

    describe("Get Event By ID", () => {
      it("Should return an event by ID", async () => {
        const eventId = "65b10bb0b57984db9b6aaed7";
        const event = {
          id: eventId,
          name: "Existing event",
          date: mockDate,
          createdAt: mockDate,
          updatedAt: mockDate,
        };

        const req = httpMocks.createRequest({
          method: "GET",
          url: `/events/${eventId}`,
          params: { id: eventId },
        }) as Request<{ id: string }, unknown, unknown>;

        const res =
          httpMocks.createResponse() as unknown as CustomResponseData<Event>;
        const next = vi.fn() as NextFunction;

        eventService.getById.mockResolvedValue(event);

        const mockHttpResponse =
          httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
        httpResponse.OK.mockReturnValue(mockHttpResponse);

        const result = await getEventById(req, res, next);

        expect(eventService.getById).toHaveBeenCalledWith(eventId);
        expect(httpResponse.OK).toHaveBeenCalledWith(res, event);
        expect(result).toBe(mockHttpResponse);
      });
    });

    describe("Get All Events", () => {
      it("Should return a list of events", async () => {
        const events = [
          {
            id: "1",
            name: "Event 1",
            date: mockDate,
            createdAt: mockDate,
            updatedAt: mockDate,
          },
          {
            id: "2",
            name: "Event 2",
            date: mockDate,
            createdAt: mockDate,
            updatedAt: mockDate,
          },
        ];

        const req = httpMocks.createRequest({
          method: "GET",
          url: "/events",
        });

        const res = httpMocks.createResponse() as unknown as CustomResponseData<
          Event[]
        >;
        const next = vi.fn() as NextFunction;

        eventService.getAll.mockResolvedValue(events);

        const mockHttpResponse =
          httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
        httpResponse.OK.mockReturnValue(mockHttpResponse);

        const result = await getAllEvents(req, res, next);

        expect(eventService.getAll).toHaveBeenCalled();
        expect(httpResponse.OK).toHaveBeenCalledWith(res, events);
        expect(result).toBe(mockHttpResponse);
      });
    });

    describe("Update Event", () => {
      it("Should update and return the updated event", async () => {
        const eventId = "65b10bb0b57984db9b6aaed7";
        const updateData = { name: "Updated event" };
        const updatedEvent = {
          id: eventId,
          name: "Updated event",
          date: mockDate,
          createdAt: mockDate,
          updatedAt: mockDate,
        };

        const req = httpMocks.createRequest({
          method: "PUT",
          url: `/events/${eventId}`,
          params: { id: eventId },
          body: updateData,
        }) as Request<
          { id: string },
          unknown,
          Partial<
            Omit<
              {
                name: string;
                id: string;
                date: Date;
                createdAt: Date;
                updatedAt: Date;
              },
              "id" | "createdAt" | "updatedAt"
            >
          >
        >;

        const res =
          httpMocks.createResponse() as unknown as CustomResponseData<Event>;
        const next = vi.fn() as NextFunction;

        eventService.update.mockResolvedValue(updatedEvent);

        const mockHttpResponse =
          httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
        httpResponse.OK.mockReturnValue(mockHttpResponse);

        const result = await updateEvent(req, res, next);

        expect(eventService.update).toHaveBeenCalledWith(eventId, updateData);
        expect(httpResponse.OK).toHaveBeenCalledWith(res, updatedEvent);
        expect(result).toBe(mockHttpResponse);
      });
    });

    describe("Delete Event", () => {
      it("Should delete an event and return no content", async () => {
        const eventId = "65b10bb0b57984db9b6aaed7";
        const deletedEvent = {
          id: eventId,
          name: "Deleted event",
          date: mockDate,
          createdAt: mockDate,
          updatedAt: mockDate,
        };

        const req = httpMocks.createRequest({
          method: "DELETE",
          url: `/events/${eventId}`,
          params: { id: eventId },
        }) as Request<{ id: string }, unknown, unknown>;

        const res =
          httpMocks.createResponse() as unknown as CustomResponseData<Event>;
        const next = vi.fn() as NextFunction;

        eventService.delete.mockResolvedValue(deletedEvent);

        const mockHttpResponse =
          httpMocks.createResponse() as unknown as CustomResponseMessage;
        httpResponse.NO_CONTENT.mockReturnValue(mockHttpResponse);

        const result = await deleteEvent(req, res, next);

        expect(eventService.delete).toHaveBeenCalledWith(eventId);
        expect(httpResponse.NO_CONTENT).toHaveBeenCalledWith(res);
        expect(result).toBe(mockHttpResponse);
      });
    });
  });
});
