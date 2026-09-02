import { Request, Response } from "express";
import { createRoomBooking, getBookingDetails } from "../services/booking.service";

//create booking

export const createBooking = async (req : Request, res : Response) => {
  try{
    const booking = req.body;
    const result = await createRoomBooking(booking);

    return res.status(201).json({
      message : 'Booking created successfully',
      data : result
    });
  } catch(error : any){

    console.log(error)
    if(error.message === "Required field are missing"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message == "Guest not found"){
      return res.status(404).json({
        message : error.message
      });
    }

    if(error.message === "Room not found"){
      return res.status(404).json({
        message : error.message
      });
    }

    if(error.message === "Room is not available"){
      return res.status(409).json({
        message : error.message
      });
    }

    if(error.message === "Invalid check-in and check-out date"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message == "Room is already booked"){
      return res.status(409).json({
        message : error.message
      });
    }

    if(error.message === "Number of guests exceeds room capacity"){
      return res.status(400).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to create booking"
    });
  }
};

//get all booking details

export const getAllBooking = async (req : Request, res : Response) => {
  try {
    const result = await getBookingDetails();

    return res.status(200).json({
      message : "Booking Details are :",
      date : result
    });
  } catch(error){
    console.log(error)

    return res.status(500).json({
      message : "Failed to get booking details" 
    });
  }
};