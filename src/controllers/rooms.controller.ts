import { Request, Response } from "express";
import { addRoom, getAllRooms, fetchRoomById, modifyRoom, removeRoom } from "../services/rooms.service";

// Create room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const result = req.body;

    const room = await addRoom(result);

    return res.status(201).json({
      message: "Room created successfully",
      data: result
    });

  } catch (error: any) {
    console.log(error);

    const errors: Record<string, [number, string]> = {
      "required field are missing": [400, "Required fields are missing"],
      "Room type not found": [404, "Room type not found"],
      "Room number is already exist": [409, "Room number already exists"]
    };

    if (errors[error.message]) {
      const [status, message] = errors[error.message];
      return res.status(status).json({ message });
    }

    return res.status(500).json({
      message: "Failed to create room"
    });
  }
};


// Get all rooms
export const getRooms = async (req: Request, res: Response) => {
  try {
    const result = await getAllRooms();

    return res.status(200).json({
      message: "Rooms retrieved successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve rooms"
    });
  }
};


// Get room by ID
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid room ID"
      });
    }

    const result = await fetchRoomById(id);

    if ((result as any[]).length === 0) {
      return res.status(404).json({
        message: "Room ID not found"
      });
    }

    return res.status(200).json({
      message: "Room retrieved successfully",
      data: result
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to retrieve room"
    });
  }
};


// Update room
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid room ID"
      });
    }
    
    const result = req.body;

    const roomupdate = await modifyRoom(id, result);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Room ID not found"
      });
    }

    return res.status(200).json({
      message: "Room updated successfully",
      data : result
    });

  } catch (error: any) {
    console.log(error);

    const errors: Record<string, [number, string]> = {
      "Required fields are missing": [400, "Required fields are missing"],
      "Room type not found": [404, "Room type not found"],
      "Room Number already exists": [409, "Room Number already exists"]
    };

    if (errors[error.message]) {
      const [status, message] = errors[error.message];
      return res.status(status).json({ message });
    }

    return res.status(500).json({
      message: "Failed to update room"
    });
  }
};


// Delete room
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid room ID"
      });
    }

    const result = await removeRoom(id);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    return res.status(200).json({
      message: "Room deleted successfully"
    });

  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete room"
    });
  }
};