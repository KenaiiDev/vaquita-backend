import {
  CustomResponseData,
  CustomResponseMessage,
  CustomResponseMessageError,
} from "@/shared/types/response.types";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export const httpResponse = {
  OK: <DataType>(res: CustomResponseData<DataType>, data: DataType) => {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data,
    });
  },
  CREATED: <DataType>(res: CustomResponseData<DataType>, data: DataType) => {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMsg: "Created",
      data,
    });
  },

  BAD_REQUEST: <ErrorType>(
    res: CustomResponseMessageError<ErrorType>,
    message: string,
    errorData: ErrorType
  ) => {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: "Bad Request",
      message,
      error: errorData,
    });
  },
  NOT_FOUND: (res: CustomResponseMessage, message: string) => {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      message,
    });
  },
  UNPROCESSABLE_ENTITY: <ErrorType>(
    res: CustomResponseMessageError<ErrorType>,
    message: string,
    errorData: ErrorType
  ) => {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      statusMsg: "Unprocessable Entity",
      message,
      error: errorData,
    });
  },

  INTERNAL_SERVER_ERROR: <ErrorType>(
    res: CustomResponseMessageError<ErrorType>,
    message: string,
    error: ErrorType
  ) => {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal Server Error",
      message,
      error: error,
    });
  },
};
