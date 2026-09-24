import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, checkUserEmailExists, createUser, getUserByEmail} from '../models/auth.model';

export const register = async (user : User) => {
  if(
    !user.name ||
    !user.email ||
    !user.password ||
    !user.role ||
    !user.phone_no
  ) {
    throw new Error('required field are missing');
  }

  const existingUser = await checkUserEmailExists(user.email);
  if((existingUser as any []).length > 0){
    throw new Error ('User already Register');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const manager: User = {
    name : user.name,
    email : user.email,
    password : hashedPassword,
    role : user.role,
    phone_no : user.phone_no
  };

  const result = await createUser(manager);
  return result;
};

//login 


export const loginUser = async (email : string, password : string) => {
  if(!email || !password){
    throw new Error ("Email and Password are requires");
  }

  const users = await getUserByEmail(email);

  if((users as any []).length === 0){
    throw new Error ("Invalid email or password");
  }

  const user = (users as any [])[0];

  const passwordMatch = await bcrypt.compare(
    password, user.password
  );

  if(!passwordMatch){
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      user_id : user.user_id,
      role : user.role
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn : '1hr'
    }
  );

  return { user, token };
};