import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";


interface ErrorHandlerResponse {
  success: boolean;
  status: number;
  data: any;
  error: Error;
}

/**
 * Error handling middleware.
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("Error in errorHandler: ", req.url, req.body, err);
    const response: ErrorHandlerResponse = {
      success: false,
      status: 500,
      data: null,
      error: err || new Error("Something went wrong"),
    };
    res.send(response);
  } catch (err) {
    next(err);
  }
};

function handlePrismaError(error: any, res: Response): never {
  if (error instanceof PrismaClientKnownRequestError) {
    let errorMessage = 'Internal server error: An unexpected error occurred. Please try again later.';
    switch (error.code) {
      case 'P2002':
        errorMessage = 'Duplicate entry: The provided data violates a unique constraint. Please ensure the data is unique.';
        break;
      case 'P2025':
        errorMessage = 'Invalid reference: The provided data references a non-existent record. Please verify the record exists.';
        break;
      case 'P2003':
        errorMessage = 'Foreign key constraint violation: The provided data violates a foreign key constraint. Ensure that all foreign key references are valid.';
        break;
      case 'P2022':
        errorMessage = 'Invalid field value: The provided data contains an invalid value for a field. Check the data types and constraints.';
        break;
      case 'P2016':
        errorMessage = 'Record not found: The requested record does not exist. Double-check the ID.';
        break;
    }
    throw new Error(errorMessage);
    
  } else {
    throw new Error(error);
    
  }
}


export { handlePrismaError, errorHandler };
