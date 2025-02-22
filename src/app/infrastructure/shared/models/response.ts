export interface ResponseOk{
  statusCode: number;
}

export interface ResponsePagination<T> {
  data: T[];
}

