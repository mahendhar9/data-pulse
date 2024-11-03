import { z } from 'zod';
import dotenv from 'dotenv';

/**
 * Load environment variables from .env file
 */
dotenv.config();

const envSchema = z.object({
  /**
   * Application environment
   * @default "development"
   */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.string().default('3000'),

  MONGODB_URI: z.string({
    required_error: 'MongoDB URI is required',
  }),

  DB_NAME: z.string().default('session_replay'),

  JWT_SECRET: z.string({
    required_error: 'JWT secret is required',
  }),

  JWT_EXPIRATION_HOURS: z.string().default('24'),

  CORS_ORIGINS: z.string().default('*'),

  SESSION_RETENTION_DAYS: z.string().default('30'),

  MAX_EVENTS_PER_SESSION: z.string().default('10000'),

  RATE_LIMIT_WINDOW_MINUTES: z.string().default('15'),

  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),

  /** Log incoming HTTP requests
   * @default "true" */
  ENABLE_REQUEST_LOGGING: z.string().default('true'),

  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

const env = envSchema.parse(process.env);

const config = {
  env: {
    isProduction: env.NODE_ENV === 'production',
    isDevelopment: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
  },
  server: {
    port: parseInt(env.PORT, 10),
    corsOrigins: env.CORS_ORIGINS === '*' ? ['*'] : env.CORS_ORIGINS.split(','),
  },
  database: {
    uri: env.MONGODB_URI,
    name: env.DB_NAME,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtExpirationHours: parseInt(env.JWT_EXPIRATION_HOURS, 10),
  },
  session: {
    retentionDays: parseInt(env.SESSION_RETENTION_DAYS, 10),
    maxEventsPerSession: parseInt(env.MAX_EVENTS_PER_SESSION, 10),
  },
  rateLimit: {
    windowMinutes: parseInt(env.RATE_LIMIT_WINDOW_MINUTES, 10),
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
  },
  logging: {
    enabled: env.ENABLE_REQUEST_LOGGING === 'true',
    level: env.LOG_LEVEL,
  },
};

export default config;
