const { Pool } = require('pg');
const { createClient } = require('redis');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Redis connection (for caching sessions/rate limiting later)
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().catch(console.error);

module.exports = { pool, redisClient };
