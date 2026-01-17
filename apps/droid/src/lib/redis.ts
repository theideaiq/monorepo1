import { Redis } from "@upstash/redis";
import { droidEnv as env } from '@repo/env/droid';

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});
