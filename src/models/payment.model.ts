import db from '../config/database';

//interface for payment detail

export interface Payment {
  booking_id : number,
  amount : number,
  payment_method : string,
  payment_status : string,
  transaction_id : string,
  payment_date : string
};

//check bookingId exists or not

export const checkBookingId = async(bookingId : number) => {
  const sql = `
  SELECT booking_id
  FROM bookings
  WHERE booking_id = ?
  `;

  const [ result ] = await db.execute(sql, [bookingId]);
  return result;
};

export const checkPaymentExists = async (bookingId : number) => {
  const sql = `
  SELECT payment_id
  FROM payments 
  WHERE booking_id = ?
  `;

  const [ result ] = await db.execute(sql, [bookingId]);
  return result;
}

//create payment

export const createPayment = async(payment : Payment) => {
  const sql = `
  INSERT INTO payments 
  (booking_id, amount, payment_method, payment_status, transaction_id, payment_date)
  VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [ result ] = await db.execute(sql,[
    payment.booking_id,
    payment.amount,
    payment.payment_method,
    payment.payment_status,
    payment.transaction_id,
    payment.payment_date
  ]);
  return result;
};