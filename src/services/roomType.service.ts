import { error } from "node:console";
import { RoomType, createRoomType, getRoomType, getRoomTypeById, modifyRoomType, deleteRoomType } from "../models/roomType.model";

// add room type

export const addRoomType = async (roomType : RoomType) => {
  if(
    !roomType.type_name ||
    !roomType.description ||
    !roomType.price_per_night ||
    !roomType.capacity
  ) {
    throw new Error ('Required field are missing');
  }

  const result = await createRoomType(roomType);
  return result;
};

// get room type

export const fetchAllRoomType = async () => {
  const result = await getRoomType();
  return result;
};

//get room type by id

export const fetchRoomTypeById = async (roomTypeId : number) => {
  const result = getRoomTypeById(roomTypeId);
  return result;
};

//update room type

export const updateRoomType = async (roomTypeId : number, roomType : RoomType) => {
  if(
    !roomType.type_name ||
    !roomType.description ||
    !roomType.price_per_night ||
    !roomType.capacity
  ) {
    throw new Error ('Required fieled are missing');
  }
  const result = await modifyRoomType(roomTypeId, roomType);
  return result;
};

// delete room type

export const removeRoomType = async (roomTypeId : number) => {
  const result = await deleteRoomType(roomTypeId);
  return result;
};