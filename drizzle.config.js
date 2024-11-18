import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
 
  dbCredentials: {
    url: "postgresql://InterviewCoach_owner:9VIib5gxJByT@ep-red-bush-a8f7d58g.eastus2.azure.neon.tech/InterviewCoach?sslmode=require",
  }
});