import db from '../config/database';


//create user for manager

export interface User{
  name : string;
  email : string;
  password : string;
  role : string;
  phone_no : string;
}

export const checkUserEmailExists = async (email :string) => {
  const sql = `
  SELECT user_id FROM users WHERE email = ?
  `;

  const [ rows ] = await db.execute(sql, [email]);
  return rows;
};

export const createUser = async (user : User) => {
  const sql = `
  INSERT INTO users (name, email, password, role, phone_no) VALUES (?, ?, ?, ?, ?)
  `;

  const [ result ] = await db.execute(sql, [
    user.name,
    user.email,
    user.password,
    user.role,
    user.phone_no
  ]);
  return result;
}

//login for manager

export const getUserByEmail = async (email : string) => {
  const sql = `
  SELECT user_id, name, email, password, role, phone_no FROM users WHERE email = ?
  `;

  const [ rows ] = await db.execute(sql, [email]);
  return rows;
};
