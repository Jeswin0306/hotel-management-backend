import { Room, checkRoomTypeExists, checkRoomNumberExists, createRoom, getRoom, getRoomById, checkRoomNumberExistForUpdate, updateRoom, checkRoomExistsForDelete, deleteRoom} from '../models/rooms.models'

//create rooms

export const addRoom = async (room : Room) => {


  if(
    !room.room_number ||
    !room.room_type_id ||
    !room.floor_number
  ) {
    throw new Error ('Required field are missing');
  }

  const roomType = await checkRoomTypeExists(room.room_type_id);
  
  if((roomType as any []).length === 0){
    throw new Error("room type not found"); 
  }

  const existingRoom = await checkRoomNumberExists(room.room_number);
  if((existingRoom as any[]).length > 0){
    throw new Error ("room number already exist")
  }

  const result = await createRoom(room);

  console.log(room);
  return result;
}

//get rooms

export const getAllRooms = async () => {
  const result = await getRoom();
  return result;
};

//get rooms by id

export const fetchRoomById = async (roomId : number) => {
  const result = await getRoomById(roomId);
  return result;
};

//update rooms

export const modifyRoom = async (roomId : number, room : Room) => {
  if(
    !room.room_number ||
    !room.room_type_id ||
    !room.floor_number 
  ) {
    throw new Error ("Required fied are missing");
  }

   const roomType = await checkRoomTypeExists(
    room.room_type_id
  );
  
  if ((roomType as any[]).length === 0) {
    throw new Error("Room type not found");
  }

  const existingRoom = await checkRoomNumberExistForUpdate(room.room_number, roomId);
  if((existingRoom as any[]).length > 0){
    throw new Error ('Room Number already exists');
  }

  const result = await updateRoom(roomId, room);
  return result;
};

//delete room

export const removeRoom = async (roomId : number) => {
  const roomNumber = await checkRoomExistsForDelete(roomId);
  if((roomNumber as any []).length === 0){
    throw new Error ('Room not found')
  }
  
  const result = await deleteRoom(roomId);
  return result;
}