import { config as loadConfigFromEnvFile } from 'dotenv';
import log4js, { getLogger } from 'log4js';

loadConfigFromEnvFile({ path: '.env' });

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['out'], level: process.env.NODE_ENV === 'test' ? 'off' : 'all' },
  },
});
const logger = getLogger('config.ts');

const env = process.env.NODE_ENV || 'development';

if (['development', 'production', 'test'].indexOf(env) === -1) {
  logger.fatal('Environment must be one of: ' + ['development', 'production', 'test'].join(', '));
  process.exit(-1);
}

export const config = {
  PORT: process.env.PORT!,
  DB_HOST: process.env.DB_HOST!,
  DB_DATABASE: process.env.DB_DATABASE!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
};
