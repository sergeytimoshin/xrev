import { ApiError, ErrorType } from '../ApiError';

const ENDPOINT = 'https://wider-soft-energy.solana-devnet.discover.quiknode.pro/bd88c62763dc12d1ff6db95b91b1027c7939e2ec/';

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

export async function request<R>(method: string, params: unknown[]): Promise<R> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params: params,
    }),
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
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
    if (response.status === 200 && typeof json.result === 'object') {
      return json.result as R;
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
