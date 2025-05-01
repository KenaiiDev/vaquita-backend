import { expect, vi, it, describe, beforeEach } from "vitest";
import { eventService } from "@/events/event.service";
import { CreateEventDto, Event } from "@/events/event.types";
import prisma from "@/shared/libs/__mocks__/prismaClient";

vi.mock("@/shared/libs/prismaClient");

const createMockEvent = (id: string, overrides: Partial<Event> = {}): Event => {
  const now = new Date();
  return {
    id,
    name: `Event ${id}`,
    date: now,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
};

describe("Event service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Create method", () => {
    it("Should return the generated event", async () => {
      const now = new Date();
      const mockedData: CreateEventDto = {
        date: now,
        name: "Test Event",
      };
      const mockedEvent = createMockEvent("1", mockedData);

      prisma.event.create.mockResolvedValue(mockedEvent);

      const event = await eventService.create(mockedData);
      expect(prisma.event.create).toHaveBeenCalledWith({ data: mockedData });
      expect(event).toStrictEqual(mockedEvent);
    });

    it("Should throw an error if prisma create fails", async () => {
      const now = new Date();
      const mockedData: CreateEventDto = {
        date: now,
        name: "Test Event",
      };
      const mockedError = new Error("Database create error");

      prisma.event.create.mockRejectedValue(mockedError);

      await expect(eventService.create(mockedData)).rejects.toThrow(
        mockedError
      );
      expect(prisma.event.create).toHaveBeenCalledWith({ data: mockedData });
    });
  });

  describe("findAll method", () => {
    it("Should return an empty array if no events exist", async () => {
      prisma.event.findMany.mockResolvedValue([]);
      const events = await eventService.findAll();
      expect(prisma.event.findMany).toHaveBeenCalled();
      expect(events).toEqual([]);
    });

    it("Should return an array of events", async () => {
      const mockedEvents = [createMockEvent("1"), createMockEvent("2")];
      prisma.event.findMany.mockResolvedValue(mockedEvents);
      const events = await eventService.findAll();
      expect(prisma.event.findMany).toHaveBeenCalled();
      expect(events).toEqual(mockedEvents);
    });

    it("Should throw an error if prisma findMany fails", async () => {
      const mockedError = new Error("Database findMany error");
      prisma.event.findMany.mockRejectedValue(mockedError);
      await expect(eventService.findAll()).rejects.toThrow(mockedError);
      expect(prisma.event.findMany).toHaveBeenCalled();
    });
  });

  describe("findById method", () => {
    const eventId = "1";

    it("Should return the event if found", async () => {
      const mockedEvent = createMockEvent(eventId);
      prisma.event.findUnique.mockResolvedValue(mockedEvent);
      const event = await eventService.findById(eventId);
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id: eventId },
      });
      expect(event).toEqual(mockedEvent);
    });

    it("Should return null if event not found", async () => {
      prisma.event.findUnique.mockResolvedValue(null);
      const event = await eventService.findById(eventId);
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id: eventId },
      });
      expect(event).toBeNull();
    });

    it("Should throw an error if prisma findUnique fails", async () => {
      const mockedError = new Error("Database findUnique error");
      prisma.event.findUnique.mockRejectedValue(mockedError);
      await expect(eventService.findById(eventId)).rejects.toThrow(mockedError);
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id: eventId },
      });
    });
  });

  describe("update method", () => {
    const eventId = "1";
    const updateData: UpdateEventDto = { name: "Updated Event Name" };

    it("Should update and return the event if found", async () => {
      const originalEvent = createMockEvent(eventId);
      const updatedEvent = {
        ...originalEvent,
        ...updateData,
        updatedAt: new Date(),
      };

      prisma.event.update.mockResolvedValue(updatedEvent);

      const event = await eventService.update(eventId, updateData);
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id: eventId },
        data: updateData,
      });
      expect(event).toEqual(updatedEvent);
    });

    it("Should throw an error if prisma update fails (e.g., not found)", async () => {
      const mockedError = new Error(
        "Database update error or Record not found"
      );
      prisma.event.update.mockRejectedValue(mockedError);

      await expect(eventService.update(eventId, updateData)).rejects.toThrow(
        mockedError
      );
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id: eventId },
        data: updateData,
      });
    });

    it("Should throw an error if prisma update fails for other reasons", async () => {
      const mockedError = new Error("Some other database update error");
      prisma.event.update.mockRejectedValue(mockedError);

      await expect(eventService.update(eventId, updateData)).rejects.toThrow(
        mockedError
      );
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id: eventId },
        data: updateData,
      });
    });
  });

  describe("delete method", () => {
    const eventId = "1";

    it("Should delete and return the event if found", async () => {
      const mockedEvent = createMockEvent(eventId);
      prisma.event.delete.mockResolvedValue(mockedEvent);

      const event = await eventService.delete(eventId);
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: eventId },
      });
      expect(event).toEqual(mockedEvent);
    });

    it("Should throw an error if prisma delete fails (e.g., not found)", async () => {
      const mockedError = new Error(
        "Database delete error or Record not found"
      );
      prisma.event.delete.mockRejectedValue(mockedError);

      await expect(eventService.delete(eventId)).rejects.toThrow(mockedError);
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: eventId },
      });
    });

    it("Should throw an error if prisma delete fails for other reasons", async () => {
      const mockedError = new Error("Some other database delete error");
      prisma.event.delete.mockRejectedValue(mockedError);

      await expect(eventService.delete(eventId)).rejects.toThrow(mockedError);
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: eventId },
      });
    });
  });
});
