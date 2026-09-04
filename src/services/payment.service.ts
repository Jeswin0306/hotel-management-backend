import { Payment, checkBookingId, createPayment, checkPaymentExists } from "../models/payment.model";

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