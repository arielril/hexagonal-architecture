import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import express from 'express';

import { PaymentController } from './controller/payment';
import { validator } from './middleware/validator';
import { errorHandler } from './middleware/errorHandler';
import { ExpressLogger } from '../../util/logger';

import { Container } from '../../types/core';
import { IHttpRoute } from '../../types/interface';

interface IHttpInterface {
  serve(): void;
}

export class HttpInterface implements IHttpInterface {
  private app?: express.Application;
  private coreContainer: Container;
  private env: any;

  constructor(config: any) {
    this.coreContainer = config.coreContainer;
    this.env = config.env;
  }

  initApp() {
    this.app = express();

    this.app.use(
      helmet(),
      cors(),
      compression(),
      bodyParser.json({
        limit: this.env.bodyLimit,
      }),
      ExpressLogger.onSuccess.bind(ExpressLogger),
      ExpressLogger.onError.bind(ExpressLogger),
    );
  }

  setupRoutes() {
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
  }

  setupNotFound() {
    this.app?.use(
      '*',
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new Error('Page not found'));
      },
    );
  }

  serve(): void {
    this.initApp();
    this.setupRoutes();

    this.setupNotFound();

    this.app?.use(errorHandler);
    this.app?.listen(this.env.httpPort);
  }
}
