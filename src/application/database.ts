import { PrismaClient } from '@prisma/client';

import { logger } from './logger';

export const db = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

db.$on('query', (e) => {
  logger.info('Query: ' + e.query);
  logger.info('Params: ' + e.params);
  logger.info('Duration: ' + e.duration + 'ms');
});
db.$on('error', (e) => logger.error(e));
db.$on('info', (e) => logger.info(e));
db.$on('warn', (e) => logger.warn(e));
