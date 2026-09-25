import db from '../config/database';

//create rooms

export interface Room {
  room_number : number,
  room_type_id : number,
  floor_number : number,
  status ?: string 
};

export const checkRoomTypeExists = async(roomTypeId : number) => {
  const sql =`
  SELECT room_type_id 
  FROM room_types 
  WHERE room_type_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomTypeId]);
  return rows;
};

export const checkRoomNumberExists = async (roomNumber : number) => {
  const sql = `
  SELECT room_number 
  FROM rooms 
  WHERE room_number = ?
  `;
  const [ rows ] = await db.execute(sql, [roomNumber]);
  return rows;
}

export const createRoom = async (room :Room) => {
  const sql = `
  INSERT INTO rooms 
  (room_number, room_type_id, floor_number, status) VALUES (?, ?, ?, ?)
  `;


  const [ rows ] = await db.execute(sql,[
    room.room_number,
    room.room_type_id,
    room.floor_number,
    room.status || "AVAILABLE"
  ]);
  return rows;
};

//get rooms

export const getRoom = async() => {
  const sql = `
  SELECT * FROM rooms
  `;

  const [ rows ] = await db.execute(sql);
  return rows;
}
// get by room Id

export const getRoomById = async (roomId : number) => {
  const sql = `
  SELECT * FROM rooms
  WHERE room_id = ? 
  `;

  const [ rows ] = await db.execute(sql, [roomId]);
  return rows;
};

//modify rooms post method


export const checkRoomNumberExistForUpdate = async (roomNumber : number, roomId : number) => {
  const sql = `
  SELECT room_id 
  FROM rooms 
  WHERE room_number = ? 
  AND room_id != ?
  `;

  const [ rows ] = await db.execute(sql, [
    roomNumber,
    roomId
  ]);
  return rows;
};

export const updateRoom = async (roomId : number, room : Room) => {
  const sql = `
  UPDATE rooms
  SET room_number = ?, 
  room_type_id = ?, floor_number = ?, status = ? WHERE room_id = ?
  `;

  const [ rows ] = await db.execute(sql,[
    room.room_number,
    room.room_type_id,
    room.floor_number,
    room.status || 'AVAILABLE',
    roomId
  ]);
  return rows;
};

//delete a room

export const checkRoomExistsForDelete = async (roomId: number) => {
  const sql = `
    SELECT room_id
    FROM rooms
    WHERE room_id = ?
  `;

  const [rows] = await db.execute(sql, [roomId]);

  return rows;
};

export const deleteRoom = async (roomId : number) => {
  const sql = `
  DELETE FROM rooms WHERE room_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomId]);
  return rows;
};