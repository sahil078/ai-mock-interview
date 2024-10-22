/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:E9mTsd2yfYrX@ep-odd-union-a50vadcm.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
}