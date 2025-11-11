import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import app from './app.js';

(async () => {
  await connectDB();
  app.listen(env.port, () => console.log(`🚀 API on http://localhost:${env.port}`));
})();
