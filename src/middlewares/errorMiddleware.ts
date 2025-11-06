import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof HttpError){
        let messages = {success: [], error: [{title: "Erro", message: err.message}]}   

        if(!res.locals.user){
            res.render("login", {messages})
        }
    } else if (err instanceof Error) {
        res.status(500).json({ error: "Erro interno do servidor", details: err.message })
    } 
}