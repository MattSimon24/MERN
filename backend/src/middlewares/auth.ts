import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req,res,next) => {
    try {
        if(!req.session.userId) throw createHttpError (401, "User not authenticated")
    } catch (error) {
      next(error);  
    }
    
}