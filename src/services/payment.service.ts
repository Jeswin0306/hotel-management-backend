import { Payment, checkBookingId, createPayment, checkPaymentExists, getAllPayment, getPaymentById, checkPaymentIdExists,  updatePaymentDetails, getPaymentByBookingId, } from "../models/payment.model";

//create payment

export const paymentDetails = async(payment : Payment) => {
  if(
    !payment.booking_id ||
    !payment.amount ||
    !payment.payment_method ||
    !payment.payment_status ||
    !payment.transaction_id ||
    !payment.payment_date
  ){
    throw new Error("Required fields are missing");
  }

  const existsPayment = await checkPaymentExists(payment.booking_id);

  if((existsPayment as any []).length > 0){
    throw new Error("Payment already exists for this booking Id");
  }

  const checkBooking = await checkBookingId(payment.booking_id);
  const booking = (checkBooking as any [])[0];

  if(!booking){
    throw new Error("Booking id not found");
  }
  
  const result = await createPayment(payment);
  return result;
}

//get all payment details

export const allPaymentDetail = async() => {
  const result = getAllPayment();
  return result;
};

//get by id

export const getPaymentDetailById = async (paymentId : number) => {

  const result = await getPaymentById(paymentId);
  return result;
};

//update payment details

export const updateDetails = async (payment : Payment, paymentId : number) => {
  if(
    !payment.amount ||
    !payment.payment_method ||
    !payment.payment_status ||
    !payment.transaction_id ||
    !payment.payment_date
  ){
    throw new Error("Required field are missing");
  }

  const bookingIdExists = await checkBookingId(payment.booking_id);
  if((bookingIdExists as any []).length === 0){
    throw new Error ("Booking Id not exists");
  }
  const paymentExists = await checkPaymentIdExists(paymentId);

  if((paymentExists as any []).length === 0) {
    throw new Error("Invalid payment id");
  }

  const result = updatePaymentDetails(payment, paymentId);
  return result;
};

//get payment detail by booking id

export const getPaymentDetailsByBookingId = async(bookingId : number) => {

  const bookingExists = await checkBookingId(bookingId);
  if((bookingExists as any []).length === 0){
    throw new Error("Booking Id not found");
  }

  const result = await getPaymentByBookingId (bookingId);

  if((result as any []).length === 0){
    throw new Error("Payment not found");
  }
  return result;
};