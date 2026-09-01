import db from "../config/database";

export interface Guest {
  first_name : string,
  last_name : string,
  email : string,
  phone_no : string,
  address : string,
  id_proof_type : string,
  id_proof_number : string
}

// 1. Create a guest POST method

export const checkExistingGuest = async (guestMail : string) => {
  const sql = `
  SELECT email 
  FROM guest 
  WHERE email = ?
  `;

  const [ rows ] = await db.execute(sql,[guestMail]);
  return rows;
}

export const createguest = async (guest : Guest) => {
  const sql = `
    INSERT INTO guest 
    (first_name, last_name, email, phone_no, address, id_proof_type, id_proof_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [ result ] = await db.execute(sql, [
    guest.first_name,
    guest.last_name,
    guest.email || null,
    guest.phone_no,
    guest.address,
    guest.id_proof_type,
    guest.id_proof_number
  ]);
  return result;
};

// 2. GET all guest from guest table

export const getAllGuests = async () => {
  const sql = `
  SELECT * from guest
  `;

  const [ rows ] = await db.execute(sql);

  return rows;
};

//3. get guesy by id

export const getGuestById = async (guestId : number) => {
  const sql = `
  SELECT * FROM guest WHERE guest_id = ? 
  `;

  const [ rows ] = await db.execute(sql, [guestId]);

  return rows;
}


//4. post guest

export const updateGuest = async (guestId : number, guest : Guest) => {

  const sql = `
  UPDATE guest SET 
  first_name = ?, last_name = ?, email = ?, phone_no = ?, address = ?, id_proof_type = ?,id_proof_number = ? 
  WHERE guest_id = ?
  `;

  const [ result ] = await db.execute(sql, [
    guest.first_name,
    guest.last_name,
    guest.email || null,
    guest.phone_no,
    guest.address,
    guest.id_proof_type,
    guest.id_proof_number,
    guestId
  ]);
  
  return result;
};

//Delete

export const deleteGuest =  async (guestId : number) => {
  const sql = `
  DELETE FROM guest WHERE guest_id = ?
  `;

  const [ result ] = await db.execute(sql, [guestId]);
  return result;
}
