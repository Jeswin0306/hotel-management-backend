import { Request, Response } from 'express';
import { Payment } from '../models/payment.model';
import { paymentDetails } from '../services/payment.service';

//create payment

export const createPayment = async (req : Request, res : Response) => {
  try{
    const payment : Payment = req.body;
    const result = await paymentDetails(payment);

    return res.status(201).json({
      message : "Payment created successfully",
      data : payment
    });
  } catch(error : any){

    console.log(error);

    if(error.message === "Required fields are missing"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === "Booking id not found"){
      return res.status(404).json({
        message : error.message
      });
    }

    if(error.message === "Payment already exists for this booking Id"){
      return res.status(401).json({
        messageg : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to create payment"
    });
  }
};