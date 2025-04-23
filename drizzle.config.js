import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js', // make sure this file exists
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_79VQXljnEyPx@ep-wandering-sound-a45u85m6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
  },
});
