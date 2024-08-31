import dotenv from 'dotenv';

dotenv.config();

const ServerConfig = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  USER_ADDRESS: process.env.USER_ADDRESS,
  API_KEY: process.env.API_KEY,
};

export default ServerConfig;