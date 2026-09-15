import { Request, Response} from 'express';
import { addRoomType, fetchAllRoomType, fetchRoomTypeById, updateRoomType, removeRoomType } from '../services/roomType.service';

// add room type

export const createRoomType = async (req : Request, res : Response) => {
  try {
    const roomType = req.body;

    const result = await addRoomType(roomType);

    res.status(200).json({
      message : 'Room Type created Successfully',
      data : roomType
    });
  } catch (Error) {
    console.log(Error);

    res.status(500).json({
      message : 'failed to create RoomType'
    });
  }
};

// get all room type

export const getAllRoomType = async (req: Request, res : Response) => {
  try {
    const result = await fetchAllRoomType();

    res.status(200).json({
      message : "Room-Types List",
      data : result
    });
  } catch (Error) {
    res.status(500).json({
      message : 'Failed to receive Room Types'
    });
  }
};

//get room by id

export const getRoomTypeById = async (req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : 'Invalid Room Types Id'
      });
    }

    const result = await  fetchRoomTypeById(id);

    if((result as any []).length === 0) {
      return res.status(404).json({
        message : "Room Types not found"
      });
    }

    res.status(200).json({
      message : "Room Types Reterived successfully",
      data : result
    });
  } catch (Error) {
    // console.log(Error);

    res.status(500).json({
      message : 'Room Types reterived failed'
    });
  }
};

//update room type

export const modifyRoomType = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({
        message : 'Invalid room type Id'
      });
    }
    const roomType = req.body;
    const result = await updateRoomType(id, roomType);
    if((result as any[]).length === 0){
      return res.status(404).json({
        message : "room type id not found"
      });
    }

    res.status(200).json({
      message : "Room Type modified successfully",
      data : result
    });
  } catch (Error){
    console.log(Error);

    res.status(500).json({
      message : 'faild to modify room type'
    });
  }
};

//delete room type

export const deleteRoomType = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({
        message : "Invalid room type Id"
      });
    }
    const result = await removeRoomType(id);
    if((result as any[]).length === 0){
      return res.status(404).json({
        message : "Room Type Id is not found"
      });
    }
    res.status(200).json({
      message : "RoomType is Deleted Sucessfully",
      data : result
    });
  } catch (Error){
      console.log(Error);
      res.status(500).json({
      message : "Failed to delete room type"
    });
  }
};