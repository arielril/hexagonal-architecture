import { env } from './util/env';

import { createContainer } from './interface/container';
import { Logger } from './util/logger';

type AppConfig = {
  http?: boolean;
  amqp?: boolean;
  cli?: boolean;
};

export class App {
  private _http?: boolean;
  private _amqp?: boolean;

  constructor({ http, amqp }: AppConfig) {
    this._http = http;
    this._amqp = amqp;
  }

  run() {
    const interfaceContainer = createContainer({
      env,
      init: {
        http: this._http,
        amqp: this._amqp,
      },
    });

    if (this._http) {
      interfaceContainer.httpInterface?.serve();
    }

    if (this._amqp) {
      interfaceContainer.amqpInterface?.connect();
    }
  }
}

const app = new App({
  http: env.httpActive,
  amqp: env.amqpActive,
});

setImmediate(() => {
  app.run();
  Logger.debug('app initialized');
});
