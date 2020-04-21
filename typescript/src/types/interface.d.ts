import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

export type HttpRouter = Router;
export type HttpRequest = Request;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export interface IHttpRoute {
  register(r: HttpRouter): void;
}

export interface IHttpInterface {
  serve(): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAmqpInterface { }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICliInterface { }
