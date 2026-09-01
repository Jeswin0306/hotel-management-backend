import db from '../config/database';

export interface Booking {
  guest_id : number,
  room_id : number,
  check_in_date : string,
  check_out_date : string,
  number_of_guests : number,
  total_amount : number,
  booking_status : string,
}

export const checkGuestExists = async (guestId: number) => {
  const sql = `
  SELECT guest_id FROM guest WHERE guest_id = ?
  `;

  const [ rows ] = await db.execute(sql, [guestId]);
  return rows;
};

export  const checkRoomExists = async (roomId : number) => {
  const sql = `
  SELECT room_id FROM rooms WHERE room_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomId]);
  return rows;
} ;

export const checkRoomAvailable = async (roomId : number) => {
  const sql = `
  SELECT room_id, status from rooms where room_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomId]);
  return  rows;
};

export const checkRoomCapacity = async (roomId : number) => {
  const sql = `
  SELECT rt.capacity 
  FROM rooms r 
  JOIN room_types rt
  ON r.room_type_id = rt.room_type_id 
  WHERE room_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomId]);
  return rows;
};

export const checkPricePerNight = async (roomId : number) => {
  const sql = `
  SELECT rt.price_per_night 
  FROM rooms r 
  JOIN room_types rt 
  ON r.room_type_id = rt.room_type_id 
  WHERE room_id = ? 
  `;

  const [ rows ] = await db.execute (sql, [roomId]);
  return rows;
}

export const createBooking = async (booking  : Booking) => {
  const sql = `
  INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, number_of_guests, total_amount, booking_status) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [ rows ] = await db.execute(sql, [
    booking.guest_id,
    booking.room_id,
    booking.check_in_date,
    booking.check_out_date,
    booking.number_of_guests,
    booking.total_amount,
    booking.booking_status,
  ]);
  return rows;
};