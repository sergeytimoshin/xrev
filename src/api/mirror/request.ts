import { ApiError, ErrorType } from '../ApiError';

type ErrorResponse = {
  ok: false,
  error: string,
}

function isErrorResponse(data: unknown): data is ErrorResponse {
  if (data && typeof data === 'object' && 'ok' in data) {
    const maybeError = data as Record<'ok', boolean>;
    return maybeError.ok === false;
  }
  return false;
}

export async function request<R>(endpoint: string, requestInit: RequestInit): Promise<R> {
  const headers = new Headers(requestInit.headers);
  headers.append('X-Token', '50ead185d22b422f81e0a8e833ce1183');

  const response = await fetch(`https://public-api.mirror-ai.net${endpoint}`, {
    ...requestInit,
    headers,
    redirect: requestInit.redirect || 'follow',
  });

  try {
    const json = await response.json();
    if (isErrorResponse(json)) {
      throw new ApiError({
        type: ErrorType.RESPONSE_ERROR,
        status: response.status,
        message: json.error,
      });
    }
    if (response.status === 200) {
      return json as R;
    }
  } catch (err) {
    if (response.status === 404) {
      throw new ApiError({
        type: ErrorType.NOT_FOUND,
        status: response.status,
        message: 'Not found',
      });
    }

    throw err;
  }

  throw new ApiError({
    type: ErrorType.UNKNOWN,
    status: response.status,
    message: 'Unexpected api request error',
  });
}
