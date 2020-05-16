import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Channel } from 'amqplib';

import { Container } from './core';

/* HTTP Interface */
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

export type HttpControllerConfig = {
  validator: typeof import('../interface/http/middleware/validator').validator;
  coreContainer: Container;
};

/* AMQP Interface */
export type AmqpChannel = Channel;

export interface IAmqpInterface {
  connect(): Promise<void>;
}

export interface IAmqpConsumer {
  assertQueue(channel: AmqpChannel): void;
}

export type AmqpConsumerConfig = {
  coreContainer: Container;
};

/* CLI Interface */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICliInterface { }
