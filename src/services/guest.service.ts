import { Guest, createguest, getAllGuests, getGuestById, updateGuest, deleteGuest, checkExistingGuest } from '../models/guest.model';

// addguest
export const addGuest = async (guest : Guest) => {
  if(
    !guest.first_name ||
    !guest.last_name ||
    !guest.phone_no ||
    !guest.email ||
    !guest.address ||
    !guest.id_proof_type ||
    !guest.id_proof_number
  ) {
    throw new Error ('Required field are missing');
  }

  const checkMailId = await checkExistingGuest(guest.email);

  if((checkMailId as any []).length > 0){
    throw new Error ("Email is already Exist");
  }

  const result = await createguest(guest);
  return result;
};

//get the all guest

export const fetchAllGuest = async () => {
  const result = await getAllGuests();
  return result;
}

//get by id

export const fetchGuestById = async (guestId : number) => {
  const result = await getGuestById(guestId);
  return result;
};

//post operation

export const editGuest = async (guestId : number, guest : Guest) => {
  if(
    !guest.first_name ||
    !guest.last_name ||
    !guest.phone_no ||
    !guest.address ||
    !guest.id_proof_type ||
    !guest.id_proof_number
  ) {
    throw new Error ("Required fields are missing");
  } 
  const existingGuest = await getGuestById(guestId);

  if((existingGuest as any[]).length === 0){
    return null;
  }

  const result = await updateGuest(guestId, guest);
  return result;
}

//delete

export const removeGuest = async (guestId : number) => {
  const result = await deleteGuest(guestId);
  return result;
}