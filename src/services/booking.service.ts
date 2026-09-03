import { Booking, checkGuestExists, checkRoomAvailable, checkRoomExists, checkRoomCapacity, checkPricePerNight, createBooking, checkRoomAlreadyBooked, updateRoomStatus, updateBookingStatus, getAllBooking, getBookingById, updateBooking, checkRoomAlreadyBookedForUpdate } from "../models/booking.model";

export const createRoomBooking = async (booking : Booking) => {
  if(
    !booking.guest_id ||
    !booking.room_id ||
    !booking.check_in_date ||
    !booking.check_out_date ||
    !booking.number_of_guests 
  ){
    throw new Error ("Required field are missing");
  }

//check guest exists

  const guestExists = await checkGuestExists(booking.guest_id);

  if((guestExists as any []).length === 0){
    throw new Error ("Guest not found");
  }

//check room exists

  const roomExists = await checkRoomExists(booking.room_id);

  if((roomExists as any[]).length === 0){
    throw new Error('Room not found');
  }

//check room avaliable

  const roomAvailable = await checkRoomAvailable(booking.room_id);

  const checkRoom = (roomAvailable as any[])[0];

  if(!checkRoom){
    throw new Error("Room not found");
  }

  if(checkRoom.status !== "AVAILABLE"){
    throw new Error("Room is not available");
  }

//check date

  const checkInDate = new Date(booking.check_in_date);
  const checkOutDate = new Date(booking.check_out_date);

  if(checkInDate >= checkOutDate){
    throw new Error ("Invalid check-in and check-out date");
  }

// check booking

  const existingBooking = await checkRoomAlreadyBooked(booking.room_id, booking
    .check_in_date, booking.check_out_date);

    if((existingBooking as any[]).length > 0){
      throw new Error("Room is already booked")
    }

// check room capacity

  const roomCapacity = await checkRoomCapacity(booking.room_id);

  const room = (roomCapacity as any [])[0];

  if(!room){
    throw new Error("Room capcity not found")
  }

  if(booking.number_of_guests > room.capacity){
    throw new Error ("Number of guest exceeds");
  }

// number of night calculation

  const checkIn = new Date (booking.check_in_date);
  const checkOut = new Date (booking.check_out_date);

  const differenceInTime = checkOut.getTime() - checkIn.getTime();

  const numberOfNight = Math.ceil(differenceInTime/(1000 * 60  * 60 * 24));

//add room price

  const roomPrice = await checkPricePerNight(booking.room_id);

  const price = (roomPrice as any [])[0];

  if(!price){
    throw new Error("Room price not found");
  }

  const total_amount = price.price_per_night * numberOfNight;

//add booking to database

  const bookingData : Booking = {
    guest_id : booking.guest_id,
    room_id : booking.room_id,
    check_in_date : booking.check_in_date,
    check_out_date : booking.check_out_date,
    number_of_guests : booking.number_of_guests,
    total_amount : total_amount,
    booking_status : 'CONFIRMED'
  }; 

  const  result  = await createBooking(bookingData);
  await updateRoomStatus(booking.room_id, "BOOKED");
  return result;
};

//get all booking

export const getBookingDetails  = async () => {
  const result = await getAllBooking();
  return result;
};

//get booking by id

export const getBoookingId = async (bookingId : number) => {
  const result = await getBookingById(bookingId);
  return result;
};

//checkout

export const checkOutBooking = async (bookingId : number) => {
  
  const result = await getBookingById(bookingId);

  if((result as any []).length === 0){
    throw new Error ("Booking not found");
  }

  const bookingResult = (result as any[])[0];
  // console.log(bookingResult);

  if(bookingResult.booking_status !== "CONFIRMED"){
    throw new Error("Booking is not active")
  }

  await updateBookingStatus(bookingId, "COMPLETED");
  await updateRoomStatus(bookingResult.room_id
    , "AVAILABLE");
};

//cancel booking

export const cancelBooking = async(bookingId : number) => {
  const result = await getBookingById(bookingId);
  
  const resultBooking = (result as any[])[0];

  if(resultBooking.booking_status !== "CONFIRMED"){
    throw new Error("Booking is not active")
  }

  await updateBookingStatus(bookingId, "CANCELED");
  await updateRoomStatus(resultBooking.room_id, "AVAILABLE");
};

//update booking

export const updateRoomBooking = async (bookingId : number, booking : Booking) => {

  if(
    !booking.check_in_date ||
    !booking.check_out_date ||
    !booking.number_of_guests
  ){
    throw new Error("Required field are missing");
  }

  const existingBooking = await getBookingById(bookingId);

  const oldBooking = (existingBooking as any[])[0];
  if(!oldBooking){
    throw new Error("Booking not found");
  }

  if(oldBooking.booking_status !== "CONFIRMED"){
    throw new Error("Booking is not active");
  }

  const checkIn = new Date(booking.check_in_date);
  const checkOut = new Date(booking.check_out_date);

  if(checkIn >= checkOut){
    throw new Error("Invalid chech-In and check_out date");
  }

  const roomCapacity = await checkRoomCapacity(oldBooking.room_id);

  const room = (roomCapacity as any[])[0];
  if(!room){
    throw new Error("room capacity not found");
  }

  if(booking.number_of_guests > room.number_of_guests){
    throw new Error("Nuumber of guest exceed room capacity");
  }

  const existingOverlap = await checkRoomAlreadyBookedForUpdate(oldBooking.room_id, bookingId,booking.check_in_date, booking.check_out_date);

  if((existingOverlap as any []).length > 0){
    throw new Error("Room is already booked for these days");
  }

  const differenceInTime = checkOut.getTime() - checkIn.getTime();

  const numberOfNight =Math.ceil(differenceInTime/(1000 * 60 * 60 * 24));

  const roomPrice = await checkPricePerNight(oldBooking.room_id);

  const priceData =(roomPrice as any[])[0];

  if(!priceData){
    throw new Error("Price not found");
  }

  const total_amount = priceData.price_per_night * numberOfNight;

  const result = await updateBooking(bookingId, booking, total_amount);

  return{
    booking_id : bookingId,
    roomId : oldBooking.room_id,
    guest_id: oldBooking.guest_id,
    check_in_date: booking.check_in_date,
    check_out_date: booking.check_out_date,
    number_of_guests: booking.number_of_guests,
    total_amount: total_amount,
    booking_status: oldBooking.booking_status
  }
};


