import { Request, Response } from "express";
import { addRoom, getAllRooms, fetchRoomById, modifyRoom,removeRoom } from '../services/rooms.service';

//add rooms

export const createRoom = async (req :Request, res : Response) => {
  try {
    const room = req.body;
    
    const result = await addRoom(room);
    res.status(200).json({
      message : "Room Created Successfully",
      data : result
    });
  } catch (error : any){
    console.log(error);

    if(error.message === 'required field are missing'){
      res.status(400).json({
        message  : 'required field are missing'
      });
    }

    if(error.message === "Room type not found"){
      res.status(404).json({
        message : "Room type is not found"
      });
    }

    if(error.message === 'Room number is already exist'){
      res.status(409).json({
        message : 'Room number is already exist'
      });
    }

    res.status(500).json({
      message : 'failed to create room'
    });
  }
};

//get all rooms

export const getRooms = async (req : Request, res : Response) => {
  try {

    const result = await getAllRooms();

    res.status(200).json({
      message : "reterived rooms",
      data : result
    });
  } catch (Error) {
    res.status(500).json({
      message : "failed to reterive data"
    });
  }
};

//get rooms by id

export const getRoomById = async (req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({
        message : 'Invalid room ID'
      });
    }

    const result = await fetchRoomById(id);
    if((result as any []).length === 0){
      return res.status(404).json({
        message : "Room id not found"
      });
    }

    res.status(200).json({
      message : "Room Reterived successfully",
      data : result
    });
  } catch(error : any){
    console.log(error.message);

    res.status(500).json({
      message : "Faild to reterived room"
    });
  }
};

// modify room

export const updateRoom = async (req : Request, res : Response) => {
  try{
    
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid Room Id" 
      });
    }

    const room = req.body;

    const result = await modifyRoom(id, room);
    if((result as any).affectedRows === 0){
      return res.status(404).json({
        message : "Room ID not found"
      });
    }

    return res.status(200).json({
      message : 'room updated successfully'
    });
    
  } catch (error : any){
    console.log(error);

    if(error.message === 'Required fields are missing'){
      return res.status(400).json({
        message : error.message
      });
    }

    if (error.message === "Room type not found") {
      return res.status(404).json({
        message: error.message
      });
    }

    if(error.message === 'Room Number already exists'){
      return res.status(409).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "failed to update room"
    });
  }
};

//delete room

export const deleteRoom = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : 'Invalid Room number'
      });
    }

    const result = await removeRoom(id);

    if((result as any).affectedRows === 0){
      return res.status(404).json({
        message : 'Room not founded'
      });
    }
    
    return res.status(200).json({
      message : 'Room deleted Successfully',
      data : result
    });
  } catch (error : any){
    console.log(error.message);

    if(error.message === 'Room not found'){
      return res.status(404).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to delete room"
    });
  }
}