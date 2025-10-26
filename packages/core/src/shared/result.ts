// Bounded Context Owner: Identity & Access Management Guild
export type Result<TSuccess, TError = string> =
  | { readonly ok: true; readonly value: TSuccess }
  | { readonly ok: false; readonly error: TError };

export const ok = <TSuccess, TError = string>(
  value: TSuccess
): Result<TSuccess, TError> => ({
  ok: true,
  value
});

export const err = <TSuccess, TError = string>(
  error: TError
): Result<TSuccess, TError> => ({
  ok: false,
  error
});
