import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
    console.log(e);
  }

  const getPortfolio = () =>{
    portfolioGetAPI()
    .then((res)=>{
      if (res?.data) {
        setPortfolioValues(res?.data);
      }
    }).catch((e)=>{
      toast.warning("Could not get portfolio values!")
    });
  };
  const onSearchSubmit = async (e: SyntheticEvent) =>{
    e.preventDefault();
    const result = await searchCompanies(search);
    //Type Narrowing
    if (typeof result === "string"){
      setServerError(result);
    }
    else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult);
  }

  useEffect(()=>{
    getPortfolio();
  }, []);
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
    .then((res)=>{
      if(res?.status ===204){
        toast.success("Stock added to portfolio");
        getPortfolio();
      }
    }).catch((e)=>{
      toast.warning("Could not create portfolio");
    })
  }
  
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value)
    .then((res)=>{
      if(res?.status ===200){
        toast.success("Stock deleted from portfolio");
        getPortfolio();
      }
    }).catch((e)=>{
      toast.warning("Could not delete portfolio");
    })
  }

  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} 
              search={search} 
              handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues!} 
                     onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} 
                onPortfolioCreate={onPortfolioCreate} />
      {serverError && <h1>{serverError}</h1>}      
    </div>
  )
}

export default SearchPage