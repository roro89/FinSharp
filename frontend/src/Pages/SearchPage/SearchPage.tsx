import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
    console.log(e);
  }
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

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;

    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  }
  
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value)=>{
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }

  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} 
              search={search} 
              handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues} 
                     onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} 
                onPortfolioCreate={onPortfolioCreate} />
      {serverError && <h1>{serverError}</h1>}      
    </div>
  )
}

export default SearchPage