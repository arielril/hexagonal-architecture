import knex from 'knex';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { IPaymentRepository } from './payment';
import { IUserRepository } from './user';

/* Http Adapter */
export interface IHttpAdapterConstructs {
  new(config: AxiosRequestConfig): IHttpAdapter;
}

export interface IHttpAdapter {
  send(config: AxiosRequestConfig): Promise<AxiosResponse>;
}

/* MySQL Adapter */

export type MysqlDatabase = knex;

export interface IMysqlAdapter {
  db: knex.QueryBuilder;
  tableName: string;
}

export type Container = {
  paymentRepository: IPaymentRepository;
  userRepository: IUserRepository;
};

export type ContainerConfig = {
  paymentProcessorUrl: string;
};

export type MysqlAdapterConfig = {
  dbConn: MysqlDatabase;
};
