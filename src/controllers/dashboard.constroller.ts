import { Request, Response } from "express";
import { totalRoomCount, availableRooms, bookedRooms, totalBookings, completedBookings, confirmedBookings, cancelledBookings, totalRevenues } from "../services/dashboard.service";
import { bookedRoom } from "../models/dashboard.model";

//total count 

export const dashboard = async (req: Request, res: Response) => {
  try {
    const totalResult = await totalRoomCount();
    const availableResult = await availableRooms();
    const roomBooked = await bookedRooms();
    const totalBooking = await totalBookings();
    const confirmedBooking = await confirmedBookings();
    const completedBooking = await completedBookings();
    const cancelledBooking = await cancelledBookings();
    const totalRevenue = await totalRevenues();

    const totalRooms = (totalResult as any[])[0];
    const availableRoomCount = (availableResult as any[])[0];
    const bookedRoomCount = (roomBooked as any[])[0];
    const totalBookingCount = (totalBooking as any [])[0];
    const confirmedBookingCount = (confirmedBooking as any[])[0];
    const completedBookingCount = (completedBooking as any [])[0];
    const cancelledBookingCount = (cancelledBooking as any[])[0];
    const totalRevenueAmount = (totalRevenue as any [])[0];

    return res.status(200).json({
      data: {
        total_room_count: totalRooms.total_room_count,
        available_room_count: availableRoomCount.available_rooms,
        booked_rooms : bookedRoomCount.booked_rooms,
        total_booking : totalBookingCount.total_booking,
        confirmed_booking : confirmedBookingCount.confirmed_bookings,
        completed_booking : completedBookingCount.completed_bookings,
        cancelled_booking : cancelledBookingCount.cancelled_bookings,
        total_amount : totalRevenueAmount.total_revenue
      }
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch room counts"
    });
  }
};