import { Request, Response} from 'express';
import { addGuest, fetchAllGuest, fetchGuestById, editGuest, removeGuest } from "../services/guest.service";
import { request } from 'node:http';
import { Guest } from '../models/guest.model';

//create guest



export const createGuest = async (req : Request, res : Response) => {
  try {
    const guest:Guest = req.body;

    const result = await addGuest(guest);

    res.status(201).json({
      message : "Guest Created Successfully",
      data : guest
    });
  } catch(error : any) {
    // console.log(error.message);


    if(error.message === 'Email is already Exist'){
      return res.status(400).json({
        message : "Email already exists"
      });
    }

    res.status(500).json({
      message : "Failed to create guest"
    });
  }
};

//get all guest

export const getAllGuests = async (req : Request, res : Response) => {
  try {
    const result = await fetchAllGuest();

    res.status(200).json({
      message : 'Guests retrived successfully',
      data : result
    });
  } catch(error) {
    res.status(500).json({
      message : 'Failed to retrieve guests'
    });
  }
};

//get by id

export const getGuestById = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);
    const result = await fetchGuestById(id);

    if((result as any[]).length === 0){
      res.status(404).json({
        message : "guest not found"
      });
    }
    
    res.status(200).json({
      message : "Guest reterived successfully",
      data : (result as any[])[0]
    });
  } catch (error){
    console.log(error),

    res.status(500).json({
      message : "failed to retrived guest"
    });
  }
};


//update guest

export const updateGuest = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)){
      return res.status(400).json({
        message : "Invaild guest ID"
      });
    }

    const guest = req.body;
    const result = await editGuest(id, guest);

    if(result === null){
      return res.status(404).json({
        message : "Guest not found"
      });
    } 
    res.status(200).json({
      message : "Guest Updated successfully",
      data : result
    });
  } catch(error) {
    console.log(error) 

    res.status(500).json({
      message : "Faild to updated Guest"
    });
  }
};

//delete guest

export const deleteGuest = async (req : Request, res : Response) => {
  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({
        message : "Invail guest ID"
      });
    }

    const result = await removeGuest(id);

    if((result as any[]).length === 0){
      return res.status(404).json({
        message : 'guest not found'
      });
    }
    return res.status(200).json({
      message : "Guest deleted Successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message : "Failed to Delete Guest"
    });
  }
};