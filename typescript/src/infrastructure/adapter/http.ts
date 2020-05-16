import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

import { IHttpAdapter } from '../../types/infrastructure';

export class HttpAdapter implements IHttpAdapter {
  private instance: AxiosInstance;

  constructor(public config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  send(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
}
