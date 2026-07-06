require('dotenv').config();
const { Pool } = require('pg');
const { createClient } = require('redis');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testPostgres() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected successfully!');
    console.log('Current DB time:', result.rows[0].now);
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
  }
}

async function testRedis() {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

  try {
    await redisClient.connect();
    const pong = await redisClient.ping();
    console.log('✅ Redis connected successfully! Response:', pong);
    await redisClient.quit();
  } catch (err) {
    console.error('❌ Redis connection failed:', err.message);
  }
}

async function runTests() {
  await testPostgres();
  await testRedis();
  await pool.end();
  process.exit(0);
}

runTests();
