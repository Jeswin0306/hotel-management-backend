import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { log } from 'node:console';

export const authenticateToken = (req : Request, res : Response, next : NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json({
        message : 'Access token required'
      });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
      return res.status(401).json({
        message : 'Invalid token'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    console.log('Decoded token: ',decoded);

    (req as any).user = decoded;
    next();

  } catch(error){

    console.log(error);
    
    return res.status(401).json({
      message : 'Invalid or expried token'
    });
  }
}; 

export const authorizeRole = (allowedRole : string) => {
  return (req : Request, res : Response, next : NextFunction) => {
    const user = (req as any).user;

    if(!user){
      return res.status(401).json({
        message : "Unauthorized"
      });
    }

  if(user.role !== allowedRole){
    return res.status(403).json({
      message : "Access denied"
    });
  }
  next();
  }
}