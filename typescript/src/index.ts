import env from './util/env';

import { createContainer } from './interface/container';

type AppConfig = {
  http?: boolean;
  amqp?: boolean;
  cli?: boolean;
};

export class App {
  private _http: boolean;

  constructor({ http }: AppConfig) {
    this._http = !http;
  }

  run() {
    const interfaceContainer = createContainer({
      env,
      init: {
        http: this._http,
      },
    });

    if (this._http) {
      interfaceContainer.httpInterface?.serve();
    }
  }
}
