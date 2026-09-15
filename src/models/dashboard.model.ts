import db from "../config/database";

//count rooms

export const getRoomCount = async() => {
  const sql = `
  SELECT COUNT(room_id) AS total_room_count
  FROM rooms
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const availableRoom = async () => {
  const sql = `
  SELECT COUNT(room_id)
  AS available_rooms
  FROM rooms
  WHERE status = "AVAILABLE" 
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const bookedRoom = async () => {
  const sql = `
  SELECT COUNT(room_id)
  AS booked_rooms
  FROM rooms
  WHERE status = "BOOKED"
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const maintanceRoom = async() => {
  const sql = `
  SELECT COUNT(room_id)
  AS maintenance_room
  FROM rooms
  WHERE status = "MAINTENANCE"
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const totalBooking = async() => {
  const sql = `
  SELECT COUNT(booking_id)
  AS total_booking
  FROM bookings
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const confirmedBooking = async() => {
  const sql = `
  SELECT COUNT(booking_id)
  AS confirmed_bookings 
  FROM bookings
  WHERE booking_status = "CONFIRMED"
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const completedBooking = async() => {
  const sql = `
  SELECT COUNT(booking_id)
  AS completed_bookings 
  FROM bookings
  WHERE booking_status = "COMPLETED"
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const cancelledBooking = async() => {
  const sql = `
  SELECT COUNT(booking_id)
  AS cancelled_bookings 
  FROM bookings
  WHERE booking_status = "CANCELED"
  `;

  const [ result ] = await db.execute(sql);
  return result;
};

export const totalRevenue = async() => {
  const sql = `
  SELECT SUM(total_amount)
  AS total_revenue
  FROM bookings
  `;

  const [ result ] = await db.execute(sql);
  return result;
};