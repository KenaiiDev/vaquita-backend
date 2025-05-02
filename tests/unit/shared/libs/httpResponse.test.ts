/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, vi, it, describe } from "vitest";
import { httpResponse } from "@/shared/libs/httpResponse";

describe("httpResponse", () => {
  describe("OK", () => {
    it("should return a response with status 200 and a success message", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const data = { message: "Success" };

      httpResponse.OK(res as any, data);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        statusMsg: "Success",
        data,
      });
    });
  });

  describe("CREATED", () => {
    it("should return a response with status 201 and a created message", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const data = { message: "Created" };

      httpResponse.CREATED(res as any, data);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 201,
        statusMsg: "Created",
        data,
      });
    });
  });

  describe("BAD_REQUEST", () => {
    it("should return a response with status 400, bad request message and error data", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const message = "Bad request";
      const errorData = { message: "Invalid input" };

      httpResponse.BAD_REQUEST(res as any, message, errorData);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        statusMsg: "Bad Request",
        message,
        error: errorData,
      });
    });
  });

  describe("NOT_FOUND", () => {
    it("should return a response with status 404 and a not found message", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const message = "Not Found";

      httpResponse.NOT_FOUND(res as any, message);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        statusMsg: "Not Found",
        message,
      });
    });
  });

  describe("UNPROCESSABLE_ENTITY", () => {
    it("should return a response with status 422, unprocessable entity message and error data", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const message = "Unprocessable Entity";
      const errorData = { message: "Validation failed" };

      httpResponse.UNPROCESSABLE_ENTITY(res as any, message, errorData);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        status: 422,
        statusMsg: "Unprocessable Entity",
        message,
        error: errorData,
      });
    });
  });

  describe("INTERNAL_SERVER_ERROR", () => {
    it("should return a response with status 500, internal server error message and error data", () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const message = "Internal Server Error";
      const errorData = { message: "An unexpected error occurred." };

      httpResponse.INTERNAL_SERVER_ERROR(res as any, message, errorData);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        statusMsg: "Internal Server Error",
        message,
        error: errorData,
      });
    });
  });
});
