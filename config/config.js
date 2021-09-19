const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWR_SECRET || "your secret key",
  mongoUri:
    process.env.MONGO_URI ||
    `mongodb://${process.env.MONGO_IP || "localhost"}:${
      process.env.MONGO_PORT || 27017
    }/mernproject`,
};

export default config;
