import { Request, Response } from "express";
import { createRoomBooking, getBookingDetails, getBoookingId, checkOutBooking, cancelBooking, updateRoomBooking } from "../services/booking.service";

//create booking

const getStatusCode = (message: string) : number => {
  const statusMap : Record<string, number> = {
    "Required field are missing": 400,
    "Required fields are missing": 400,
    "Invalid check-in and check-out date": 400,
    "Number of guests exceeds room capacity": 400,

    "Guest not found": 404,
    "Room not found": 404,
    "Booking not found": 404,

    "Room is not available": 409,
    "Room is already booked": 409,
    "Room is already booked for these dates": 409,
    "Booking is not active": 409,
  };
  return statusMap[message] || 500;
}

export const createBooking = async (req : Request, res : Response) => {
  try{
    const booking = req.body;
    const result = await createRoomBooking(booking);

    return res.status(201).json({
      message : 'Booking created successfully',
      data : booking
    });
  } catch(error : any){

    console.log(error);

    const statusCode = getStatusCode(error.message);

    return res.status(statusCode).json({
      message : statusCode === 500
      ? "Failed to create booking"
      : error.message,
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

    const statusCode = getStatusCode(error.message);

    return res.status(statusCode).json({
      message : 
      statusCode === 500
      ? "Checkout failed"
      : error.message
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

export const updateBookingController = async (req: Request,res: Response) => {
  try {
    const bookingId = Number(req.params.id);

    const booking = req.body;

    const result =
      await updateRoomBooking(bookingId,booking);

    return res.status(200).json({
      message: "Booking updated successfully",
      data: result
    });

  } catch (error: any) {

    console.log(error);

    const statusCode = getStatusCode(error.message);

    return res.status(statusCode).json({
      message : 
      statusCode === 500
      ? "Filed to cancel booking"
      : error.messaage,
    })
  }
};