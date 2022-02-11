export interface Error {
    isOperational: boolean,
    statusCode: number,
    status: string,
    message: string,
    stack?: string
  }

export interface ErrorResponse {
    status: number,
    data: { status: string, error: Error }
  }
