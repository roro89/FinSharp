import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "http://localhost:5017/api/comments/";

export const commentPostAPI = async (title : string, content: string, symbol: string) => {
    try{
        const data = await axios.post<CommentPost>(api + `${symbol}`, {
            title: title,
            content: content,
        });
        return data;
    } catch(error){
        handleError(error);
    }
}

export const commentGetAPI = async (symbol: string) => {
    try{
        const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
        return data;
    } catch(error){
        handleError(error);
    }
}