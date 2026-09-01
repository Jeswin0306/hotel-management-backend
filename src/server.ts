import dotenv from "dotenv";
import app from './app';
import { testConnection } from "./config/database";

dotenv.config();

const PORT = process.env.PORT;

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});