import db from '../config/database'


//create room type
export interface RoomType {
  type_name : string,
  description : string,
  price_per_night : number,
  capacity : number
};

export const createRoomType = async (roomType : RoomType) => {
  const sql = `
    INSERT INTO room_types
    (type_name, description, price_per_night, capacity) VALUES 
    (?, ?, ?, ?)
  `;

  const [ result ] = await db.execute(sql, [
    roomType.type_name,
    roomType.description,
    roomType.price_per_night,
    roomType.capacity 
  ]);

  return result;
};

// get room type

export const getRoomType = async () => {
  const sql = `
  SELECT * FROM room_types
  `;

  const [ rows ] = await db.execute(sql);
  return rows;
};

//get by id

export const getRoomTypeById = async (roomTypeId : number) => {
  const sql = `
  SELECT * FROM room_types WHERE room_type_id = ?
  `;

  const [ rows ] = await db.execute(sql, [roomTypeId]);
  return rows;
};

//modify room type

export const modifyRoomType = async (roomTypeId : number, roomType : RoomType) => {
  const sql = `
  UPDATE room_types SET 
  type_name = ?,
  description = ?,
  price_per_night = ?,
  capacity = ? 
  WHERE room_type_id = ?
  `;

  const [ rows ] = await db.execute(sql, [
    roomType.type_name,
    roomType.description,
    roomType.price_per_night,
    roomType.capacity,
    roomTypeId
  ]);
  return rows;
};

//delete

export const deleteRoomType = async (roomTypeId : number) => {
  const sql = `
  DELETE FROM room_types WHERE room_type_id = ? 
  `;

  const [ rows ] = await db.execute (sql, [roomTypeId]);
  return rows;
};