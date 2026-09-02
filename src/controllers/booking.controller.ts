import { Request, Response } from "express";
import { createRoomBooking, getBookingDetails, getBoookingId, checkOutBooking, cancelBooking, updateRoomBooking } from "../services/booking.service";

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

    console.log(error.message)
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

//get booking details by id

export const getBookingById = async (req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(404).json({
        message : "Invalid bookking id"
      });
    }

    const result = await getBoookingId(id);

    if((result as any []).length === 0){
      return res.status(401).json({
        messagee : "Booking id not found"
      });
    }

    return res.status(200).json({
      message : "Booking details retervied successfully",
      data : result
    });
  } catch(error : any){
    return res.status(500).json({
      message : "Failed to get booking details"
    });
  }
};

//checkout booking

export const checkOut = async(req : Request, res :Response) => {
  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid booking ID"
      });
    }

    const result = await checkOutBooking(id)

    return res.status(200).json({
      message : "checkout successful",
      data : result
    });
  } catch (error : any){

    console.log(error.message);

    if(error.message === "Booking not found"){
      return res.status(404).json({
        message : error.message
      });
    }

    if(error.message === "Booking is not active"){
      return res.status(409).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "CheckOut failed "
    });
  }
};

//cancel booking

export const cancelRoomBookings = async (req : Request, res : Response) => {
  try{
    
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid booking ID"
      });
    }

    const result = await cancelBooking(id);
    return res.status(200).json({
      message : "Booking canceled successfully"
    });
  } catch (error : any){ 
    console.log(error);

    if(error.message === "Booking is not active"){
      return res.status(404).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to cancel booking"
    });
  }
};

//update booking

export const updateBooking = async (req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid booking ID"
      });
    }

    const result = await updateRoomBooking(id)
  }
}