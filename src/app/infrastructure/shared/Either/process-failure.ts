export interface BadRquestFailure {
  kind: "BadRequest";
  status: 400;
  message: string[];
}

export interface UnauthorizedFailure {
  kind: "Unauthorized";
  status: 401;
}

export interface ServerFailure {
  kind: "ServerFailure";
  status: 500;
}

export interface NotFoundFailure {
  kind: "NotFound";
  status: 404;
}

export type ProcessFailure =
  | BadRquestFailure
  | UnauthorizedFailure
  | ServerFailure
  | NotFoundFailure;
