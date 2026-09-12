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

//get all payment

export const getAllPayment = async () => {
  const sql = `
  SELECT * FROM payments;
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

//get by id

export const getPaymentById = async (paymentId : number) => {
  const sql = `
  SELECT *
  FROM payments
  WHERE payment_id = ?
  `;

  const [ result ] = await db.execute(sql,[paymentId]);
  return result;
};

//modify by id

export const checkPaymentIdExists = async (paymentId : number) => {
  const sql = `
  SELECT * 
  FROM payments
  WHERE payment_id = ?
  `;

  const [ result ] = await db.execute(sql, [paymentId]);
  return result;

}


export const updatePaymentDetails = async(payment : Payment, paymentId : number) => {
  const sql = `
  UPDATE payments
  SET amount = ?, payment_method = ?, payment_status = ?, transaction_id = ?, payment_date = ?
  WHERE payment_id = ?
  `;

  const [ result ] = await db.execute(sql, [
    payment.amount,
    payment.payment_method,
    payment.payment_status,
    payment.transaction_id,
    payment.payment_date,
    paymentId
  ]);
  return result;
};

//get payment detail by booking id

export const getPaymentByBookingId = async (boookingId : number) => {
  const sql = `
  SELECT *
  FROM payments
  WHERE booking_id = ?
  `;

  const [ result ] = await db.execute(sql,[boookingId]);
  return result;
};