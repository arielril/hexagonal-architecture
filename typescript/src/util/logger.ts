import { init } from '@somosphi/logger';

export const {
  ExpressLogger,
  Logger,
} = init({
  PROJECT_NAME: 'hex-ts',
  LOG_LEVEL: 'info',
});
