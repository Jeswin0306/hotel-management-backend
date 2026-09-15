import { getRoomCount, availableRoom, bookedRoom, maintanceRoom, totalBooking, confirmedBooking, completedBooking, cancelledBooking, totalRevenue } from "../models/dashboard.model";

//total room count

export const totalRoomCount = async() => {
  const result = getRoomCount();
  return result;
};

export const availableRooms = async() => {
  const result = await availableRoom();
  return result
};

export const bookedRooms = async() => {
  const result = await bookedRoom();
  return result;
};

export const maintanceRooms = async() => {
  const result = await maintanceRoom();
  return result;
};

export const totalBookings = async() => {
  const result = await totalBooking();
  return result;
};

export const confirmedBookings = async() => {
  const result = await confirmedBooking();
  return result;
};

export const cancelledBookings = () => {
  return confirmedBooking();
};

export const completedBookings = () => {
  return completedBooking();
};

export const totalRevenues = () => {
  return totalRevenue();
};