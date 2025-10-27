import { Context } from "hono";
import { ZodError } from "zod";
import { Prisma } from "./generated/prisma";
import logger from "./logger";

export function errorHandler(err: Error, c: Context) {
  // Handle JSON parsing errors as validation errors
  if (err.constructor.name === "HTTPException") {
    const errorResponse = {
      error: true,
      status: 400,
      details: "JSON parsing error",
      info: err.message,
    };

    logger.warn(`JSON parsing error on ${c.req.path}: ${err.message}`);
    return c.json(errorResponse, 400);
  }

  if (err instanceof ZodError) {
    const errorResponse = {
      error: true,
      status: 400,
      details: "Validation error",
      info: err.errors
        .map(e =>
          e.path.length > 0 ? `${e.path.join(".")}: ${e.message}` : e.message
        )
        .join(", "),
      instance: c.req.path,
    };

    logger.warn(
      `Validation error on ${c.req.path}: ${errorResponse.details} ${errorResponse.info}`
    );
    return c.json(errorResponse, 400);
  }

  // Handle 404 Not Found errors
  if (err instanceof NotFoundError) {
    const errorResponse = {
      error: true,
      status: err.status,
      details: "Not found error",
      info: err.message,
    };

    logger.warn(`Not found error on ${c.req.path}: ${err.message}`);
    return c.json(errorResponse, 404);
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle 409 Duplicate errors
    if (err.code === "P2002") {
      const errorResponse = {
        error: true,
        status: 409,
        details: "Duplicate error",
        info: err.message,
      };
      logger.warn(`Prisma duplicate error on ${c.req.path}: ${err.message}`);
      return c.json(errorResponse, 409);
    }

    // Handle 404 Not Found errors (foreign key constraint violation)
    if (err.code === "P2003") {
      const errorResponse = {
        error: true,
        status: 404,
        details: "Not found error",
        info: err.message,
      };
      logger.warn(`Prisma foreign key error on ${c.req.path}: ${err.message}`);
      return c.json(errorResponse, 404);
    }

    // P2025: Record to delete does not exist
    if (err.code === "P2025") {
      const errorResponse = {
        error: true,
        status: 404,
        details: "Not found error",
        info: err.message,
      };
      logger.warn(
        `Prisma record not found error on ${c.req.path}: ${err.message}`
      );
      return c.json(errorResponse, 404);
    }

    // Handle other Prisma errors
    const errorResponse = {
      error: true,
      status: 500,
      details: "Database error",
      info: err.message,
    };

    logger.error(`Prisma error on ${c.req.path}: ${err.message}`);
    return c.json(errorResponse, 500);
  }

  // Handle other errors
  const errorResponse = {
    error: true,
    status: 500,
    details: "Internal server error",
    info: err.message || "An unexpected error occurred",
  };

  logger.error(`Internal server error on ${c.req.path}: ${err.message}`);
  return c.json(errorResponse, 500);
}

export class NotFoundError extends Error {
  public status: number;
  public type: string;
  public title: string;
  public detail: string;
  public instance: string;

  constructor(message: string, instance: string, title: string) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    this.type = "about:blank";
    this.title = title;
    this.detail = message;
    this.instance = instance;
  }
}
