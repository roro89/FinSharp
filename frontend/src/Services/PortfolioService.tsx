import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { CommentGet, CommentPost } from "../Models/Comment";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5017/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
    try{
        const data = await axios.post<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    } catch(error){
        handleError(error);
    }
}

export const portfolioDeleteAPI = async (symbol: string) => {
    try{
        const data = await axios.delete<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    } catch(error){
        handleError(error);
    }
}

export const portfolioGetAPI = async () => {
    try{
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch(error){
        handleError(error);
    }
}