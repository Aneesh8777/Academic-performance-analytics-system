import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2d'
};

if (!env.mongoUri || !env.jwtSecret) {
  console.error('Missing MONGO_URI or JWT_SECRET in environment');
  process.exit(1);
}
