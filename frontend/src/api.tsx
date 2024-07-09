import axios from "axios"
import { CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company";

export interface SearchResponse {
    data: CompanySearch[];
}
export const searchCompanies = async (query : string) =>{
    try{
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch(error){
        if (axios.isAxiosError(error)){
            console.log("Error message: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return "Unexpected error has occured";
        }
    }

}

export const getCompanyProfile = async (query : string) =>{
    try{
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch(error: any){
        console.log("Error message from API: ", error.message)
    }
}

export const getKeyMetrics = async (query : string) =>{
    try{
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch(error: any){
        console.log("Error message from API: ", error.message)
    }
}