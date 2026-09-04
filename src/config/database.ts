import dotenv from "dotenv";
import mysql from "mysql2/promise";


dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

export const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default db;