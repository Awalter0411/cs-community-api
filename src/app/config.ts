import dotenv from "dotenv";

dotenv.config();

const {
  PORT = 3000,
  SECRET = "javascript",
  DATABASE_HOST = "localhost",
  DATABASE_USER = "root",
  DATABASE_PORT = "3306",
  DATABASE_PASSWORD = "lyxa1105",
  DATABASE_NAME = "cs-community",
} = process.env;

const config = {
  PORT,
  SECRET,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_NAME,
};

export default config;
