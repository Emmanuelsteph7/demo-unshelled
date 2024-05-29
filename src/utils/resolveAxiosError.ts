import { AxiosError } from "axios";

export const resolveAxiosError = (error: AxiosError<any, any>) => {
  const defaultErrorMessage = "Something went wrong!!!";
  const defaultResponse = { status: 400, message: defaultErrorMessage };

  try {
    if (!error) return defaultResponse;
    const errorResponse = error.response;
    const errorResponseStatus = errorResponse?.status;
    const errorResponseData = errorResponse?.data;

    const message = errorResponseData?.error as string;

    return { status: errorResponseStatus, message };
  } catch (error) {
    return defaultResponse;
  }
};
