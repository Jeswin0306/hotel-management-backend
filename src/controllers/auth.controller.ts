import { Request, Response } from 'express';
import { registerManager, loginUser, registerStaff, /*loginStaff */} from '../services/auth.service';

export const registerManagerController = async(req : Request, res : Response) => {
  try {
    const user = req.body;

    const result = await registerManager(user);
    return res.status(201).json({
      message : 'Manager registered Sucessfully',
      data : result
    });
  } catch (error : any) {

    console.log(error.message);

    if(error.message === 'Required fields are missing'){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === 'User already Register'){
      return res.status(409).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : 'Failed to register manager'
    });
  }
};

// login manager

export const loginController = async (req : Request, res : Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return res.status(200).json({
      message : "Login Successfully",
      data : {
        user_id : result.user.user_id,
        name : result.user.name,
        email : result.user.email,
        role : result.user.role,
        phone_no : result.user.phone_no
      },
      token : result.token
    })
  } catch(error : any) {

    console.log(error.message);

    if(error.message === 'Email and Password are requires'){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === "Invalid email or password"){
      return res.status(401).json({
        message : error.message
      });
    }

    if(error.message === 'Access Denied'){
      return res.status(403).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "failed to login"
    });
  }
};

//register staff

export const registerStaffController = async (req : Request, res : Response) => {
  try {
    const user = req.body;

    const result = await registerStaff(user);

    return res.status(201).json({
      message : "Staff registered successfully"
    });
  } catch (error : any){

    console.log(error.message);

    if(error.message === "Required fields are missing"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === 'Email already exists'){
      return res.status(409).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : 'Failed to register Staff'
    });
  }
};

//login staff
// export const loginStaffController = async (req : Request, res : Response) => {
//   try {
//     const { email, password } = req.body;

//     const result = await loginStaff(email, password);

//     return res.status(200).json({
//       message : "staff Login Successfully",
//       data : {
//         user_id : result.user.user_id,
//         name : result.user.name,
//         email : result.user.email,
//         role : result.user.role,
//         phone_no : result.user.phone_no
//       },
//       token : result.token
//     })
//   } catch(error : any) {

//     console.log(error);

//     if(error.message === 'email and password are requires'){
//       return res.status(400).json({
//         message : error.message
//       });
//     }

//     if(error.message === "invalid email or password"){
//       return res.status(401).json({
//         message : error.message
//       });
//     }

//     if(error.message === 'Access Denied'){
//       return res.status(403).json({
//         message : error.message
//       });
//     }

//     return res.status(500).json({
//       message : "failed to login"
//     });
//   }
// };