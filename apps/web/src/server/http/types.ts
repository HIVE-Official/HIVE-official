// Bounded Context Owner: Identity & Access Management Guild
export interface HttpSuccess<TBody> {
  readonly status: number;
  readonly body: TBody;
  readonly headers?: Record<string, string>;
}

export interface HttpError {
  readonly status: number;
  readonly error: string;
  readonly details?: Record<string, unknown>;
}

export type HttpResponse<TBody> = HttpSuccess<TBody> | HttpError;
