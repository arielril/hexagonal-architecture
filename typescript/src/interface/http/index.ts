import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import express from 'express';

import { PaymentController } from './controller/payment';
import { validator } from './middleware/validator';
import { errorHandler } from './middleware/errorHandler';
import { ExpressLogger, Logger } from '../../util/logger';

import { Container } from '../../types/core';
import { IHttpRoute, IHttpInterface } from '../../types/interface';

type Config = {
  env: typeof import('../../util/env').default;
  coreContainer: Container;
};

export class HttpInterface implements IHttpInterface {
  private app?: express.Application;
  private coreContainer: Config['coreContainer'];
  private env: Config['env'];

  constructor(config: Config) {
    Logger.debug({
      coreContainer: config.coreContainer !== undefined,
      env: config.env !== undefined,
    }, 'fun: HttpInterface.constructor');

    this.coreContainer = config.coreContainer;
    this.env = config.env;
  }

  initApp() {
    Logger.debug('fun: HttpInterface.initApp');

    this.app = express();

    this.app.use(
      helmet(),
      cors(),
      compression(),
      bodyParser.json({
        limit: this.env.httpBodyLimit,
      }),
      ExpressLogger.onSuccess.bind(ExpressLogger),
      ExpressLogger.onError.bind(ExpressLogger),
    );

    this.setupRoutes();
    this.setupNotFound();

    this.app.use(errorHandler);
  }

  setupRoutes() {
    Logger.debug('fun: HttpInterface.setupRoutes');

    [
      new PaymentController({
        coreContainer: this.coreContainer,
        validator,
      }),
    ]
      .forEach((route: IHttpRoute) => {
        const router = express.Router({ mergeParams: true });
        route.register(router);
        this.app?.use(router);
      });

    Logger.debug('fun: HttpInterface.setupRoutes end');
  }

  setupNotFound() {
    Logger.debug('fun: HttpInterface.setupNotFound');

    this.app?.use(
      '*',
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new Error('Page not found'));
      },
    );
  }

  serve(): void {
    Logger.debug('fun: HttpInterface.serve');

    this.initApp();

    this.app?.listen(this.env.httpPort);

    Logger.info({
      httpPort: this.env.httpPort,
    }, 'http interface listening');
  }
}
