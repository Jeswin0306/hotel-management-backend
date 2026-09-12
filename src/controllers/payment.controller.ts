import { Request, Response } from 'express';
import { Payment, updatePaymentDetails } from '../models/payment.model';
import { paymentDetails, allPaymentDetail, getPaymentDetailById, updateDetails, getPaymentDetailsByBookingId } from '../services/payment.service';
import { exportString } from 'node:ffi';

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

//get all payemnt detail

export const getAllPayment = async(req : Request, res :  Response) => {
  try{
    const result = await allPaymentDetail();
    return res.status(200).json({
      message : "payment details reterive successfully",
      date : result
    });
  } catch (error){
    return res.status(500).json({
      message : "failed to reterive payment details"
    });
  }
};

//get detail by ID

export const getPaymentById = async (req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(404).json({
        message : "Invalid payment Id"
      });
    }

    const result = await getPaymentDetailById(id);
    if((result as any []).length === 0){
      return res.status(404).json({
        message : "Payment Id not found"
      });
    }

    return res.status(200).json({
      message : "Payment Details",
      data : result
    });
  } catch(error : any){
    return res.status(500).json({
      message : "failed to get payment details"
    });
  }
};

//update payment details

export const updatePayment = async(req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(404).json({
        message : "Invalid payment id"
      });
    }

    const payment = req.body;

    const result = updatePaymentDetails(payment, id);
    return res.status(201).json({
      message : "Details updated successfully",
      data : payment
    });
  } catch(error : any){
    if(error.message === "Invalid payment Id"){
      return res.status(400).json({
        message : error.message
      });
    }
    if(error.message === "Required field are missing"){
      return res.status(401).json({
        message : error.message
      });
    }

    if(error.message === "Booking Id not exists"){
      return res.status(404).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to update payment details"
    });
  }
};


//get payment detail by booking id

export const getPaymentByBookingId = async(req : Request, res : Response) => {
  try{
    const id = Number(req.params.bookingId);
    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid Id"
      })
    }
    const result = await getPaymentDetailsByBookingId(id);
    return res.status(200).json({
      message : "Payment details fetched successfully",
      data : result
    });
  } catch(error : any){
    console.log(error);
    if(error.message === "Booking Id not found"){
      return res.status(404).json({
        message : error.message
      });
    }

    if(error.message === "Payment no found"){
      return res.status(404).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to fetch data"
    });
  }
};