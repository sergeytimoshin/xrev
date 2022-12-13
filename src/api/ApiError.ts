type ApiErrorInit = {
  type: ErrorType;
  message?: string;
  status?: number;
  customerMessage?: string;
  customerTitle?: string;
};

export enum ErrorType {
  RESPONSE_ERROR = 'responseerror',
  NOT_FOUND = 'notfound',
  UNKNOWN = 'unknown',
};

export class ApiError extends Error {
  constructor(private data: ApiErrorInit) {
    super(data.message || '');
  }

  public getType(): string {
    return this.data.type;
  }

  public getStatus(): number {
    return this.data.status || 0;
  }

  public getUserMessage(): string {
    return this.data.customerMessage || '';
  }

  public getUserTitle(): string {
    return this.data.customerTitle || '';
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
